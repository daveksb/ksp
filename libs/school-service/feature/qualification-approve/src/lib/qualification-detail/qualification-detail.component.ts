import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  QualificationApproveDetailComponent,
  QualificationApprovePersonComponent,
} from '@ksp/shared/form/others';
import { FormMode } from '@ksp/shared/interface';
import {
  AddressService,
  GeneralInfoService,
  RequestService,
} from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ksp-qualification-detail',
  templateUrl: './qualification-detail.component.html',
  styleUrls: ['./qualification-detail.component.scss'],
})
export class QualificationDetailComponent implements OnInit {
  uniqueTimestamp!: string;

  option1 = this.fb.control(false);
  option2 = this.fb.control(false);
  option3 = this.fb.control(false);
  option4 = this.fb.control(false);

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    education: [],
    edu2: [],
    edu3: [],
    edu4: [],
  });
  requestNumber = '';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  prefixList$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  countries$!: Observable<any>;
  nationalitys$!: Observable<any>;
  schoolId = '0010201056';

  requestDate = thaiDate(new Date());
  requestSubType!: number;
  requestId!: number;
  requestStatus!: number;
  currentProcess!: number;

  otherreason: any;
  refperson: any;

  evidenceFiles = [
    {
      name: 'หนังสือนำส่งจากหน่วยงานผู้ใช้',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาทะเบียนบ้าน',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาหนังสือแจ้งการเทียบคุณวุฒิ (กรณีจบการศึกษาจากต่างประเทศ)',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนา กพ.7 / สมุดประจำตัว',
      fileId: '',
      fileName: '',
    },
    {
      name: 'สำเนาหลักฐานการเปลี่ยนชื่อ นามสกุล',
      fileId: '',
      fileName: '',
    },
    { name: 'เอกสารอื่นๆ', fileId: '', fileName: '' },
  ];

  mode!: FormMode;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestService: RequestService,
    private route: ActivatedRoute
  ) {}

  get Option1$() {
    return this.option1.valueChanges;
  }
  get Option2$() {
    return this.option2.valueChanges;
  }
  get Option3$() {
    return this.option3.valueChanges;
  }
  get Option4$() {
    return this.option4.valueChanges;
  }

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.getListData();
    this.checkRequestId();
    this.checkRequestSubType();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestData(this.requestId);
      }
    });
  }

  checkRequestSubType() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      //this.form.reset();
      if (Number(params['subtype'])) {
        this.requestSubType = Number(params['subtype']);
      }
    });
  }

  loadRequestData(id: number) {
    this.requestService.getRequestById(id).subscribe((res: any) => {
      if (res) {
        this.requestNumber = res.requestno;
        this.requestStatus = +res.requeststatus;
        this.currentProcess = +res.currentprocess;
        this.requestDate = thaiDate(new Date(`${res.requestdate}`));
        res.birthdate = res.birthdate?.split('T')[0];
        this.form.get('userInfo')?.patchValue(res);
        res.eduinfo = JSON.parse(atob(res.eduinfo));
        this.form.get('education')?.patchValue(res.eduinfo[0]);
        this.form.get('education')?.patchValue(res.eduinfo[0]);
        res.addressinfo = JSON.parse(atob(res.addressinfo));
        for (let i = 0; i < res.addressinfo.length; i++) {
          const form = this.form.get(`addr${i + 1}`) as AbstractControl<
            any,
            any
          >;
          this.getAmphurChanged(i + 1, res?.addressinfo[i].province);
          this.getTumbon(i + 1, res?.addressinfo[i].amphur);
          form?.patchValue(res?.addressinfo[i]);
        }
        console.log(this.amphurs1$);
        res.refperson = JSON.parse(atob(res.refperson));
        res.otherreason = JSON.parse(atob(res.otherreason));
        this.refperson = res.refperson;
        this.otherreason = res.otherreason;
        this.mode = 'view';
      }
    });
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
  }

  cancel() {
    if (this.mode == 'view') {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: {
          title: `คุณต้องการยกเลิกการยื่นคำขอ
          ใช่หรือไม่? `,
          btnLabel: 'ยืนยัน',
        },
      });
      confirmDialog.componentInstance.confirmed
        .pipe(
          switchMap((res) => {
            if (res) {
              const payload = {
                id: `${this.requestId}`,
                requeststatus: `0`,
              };
              return this.requestService.cancelRequest(payload);
            }
            return EMPTY;
          })
        )
        .subscribe((res) => {
          this.onCancelCompleted();
        });
    } else {
      this.router.navigate(['/temp-license', 'list']);
    }
  }
  get inValidForm() {
    return (
      !this.form.get('userInfo')?.valid ||
      !this.form.get('addr1')?.valid ||
      !this.form.get('addr2')?.valid ||
      !this.form.get('education')?.valid
    );
  }

  onSave() {
    const confirmDialog = this.dialog.open(
      QualificationApproveDetailComponent,
      {
        width: '850px',
        data: {
          education: this.form.get('education')?.value,
          mode: this.mode,
          otherreason: this.otherreason,
        },
      }
    );
    confirmDialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.saved(res);
      }
    });
  }

  saved(reasonForm: any) {
    const completeDialog = this.dialog.open(
      QualificationApprovePersonComponent,
      {
        width: '850px',
        data: { mode: this.mode, refperson: this.refperson },
      }
    );

    completeDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.onConfirmed(reasonForm, res);
      }
    });
  }

  onConfirmed(reasonForm: any, refPersonForm: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            //eduInfo otherreason addressinfo refperson
            const formData: any = this.form.getRawValue();
            console.log('formData', formData);
            if (formData?.addr1?.addressType) formData.addr1.addressType = 1;
            if (formData?.addr2?.addressType) formData.addr2.addressType = 2;
            const { refperson } = refPersonForm;
            const { otherreason } = reasonForm;
            const userInfo = formData.userInfo;
            userInfo.ref1 = '2';
            userInfo.ref2 = '06';
            userInfo.ref3 = '1';
            userInfo.systemtype = '2';
            userInfo.requesttype = '6';
            userInfo.subtype = `${this.requestSubType}`;
            userInfo.schoolid = this.schoolId;
            userInfo.currentprocess = '1';
            userInfo.requeststatus = '1';
            const payload = {
              ...userInfo,
              ...{
                addressinfo: JSON.stringify([formData.addr1, formData.addr2]),
              },
              ...{ eduinfo: JSON.stringify([formData.education]) },
              ...{ refperson: JSON.stringify(refperson) },
              ...{ otherreason: JSON.stringify(otherreason) },
            };
            return this.requestService.createRequest(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.onCompleted();
      });
  }
  onClickPrev() {
    this.router.navigate(['/temp-license']);
  }
  onCancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ระบบทำการยกเลิกเรียบร้อย',
        content: `วันที่ : ${this.requestDate}
        เลขที่คำขอ : ${this.requestNumber}`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }
  getAmphurChanged(addrType: number, province: any) {
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }
  amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }
  getTumbon(addrType: number, amphur: any) {
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }
  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;
    this.provinces2$ = this.provinces1$;
    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }
}
