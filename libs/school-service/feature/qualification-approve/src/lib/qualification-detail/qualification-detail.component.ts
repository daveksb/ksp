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

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
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
  evidenceFiles = files;
  mode!: FormMode;
  showEdu2 = false;
  showEdu3 = false;
  showEdu4 = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestService: RequestService,
    private route: ActivatedRoute
  ) {}

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

        const edus = JSON.parse(atob(res.eduinfo));
        this.patchEdu(edus);

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

        res.refperson = JSON.parse(atob(res.refperson));
        res.otherreason = JSON.parse(atob(res.otherreason));
        this.refperson = res.refperson;
        this.otherreason = res.otherreason;
        this.mode = 'view';
      }
    });
  }

  patchEdu(edus: any[]) {
    //console.log('edus = ', edus);
    if (edus && edus.length) {
      edus.map((edu, i) => {
        if (edu.degreeLevel === 2) {
          this.showEdu2 = true;
        }
        if (edu.degreeLevel === 3) {
          this.showEdu3 = true;
        }
        if (edu.degreeLevel === 4) {
          this.showEdu4 = true;
        }
        (this.form.get(`edu${i + 1}`) as AbstractControl<any, any>).patchValue(
          edu
        );
      });
    }
  }

  eduSelected(type: number, evt: any) {
    const checked = evt.target.checked;
    if (type === 2) {
      this.showEdu2 = checked;
    }
    if (type === 3) {
      this.showEdu3 = checked;
    }
    if (type === 4) {
      this.showEdu4 = checked;
    }
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
                requeststatus: '0',
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
            //console.log('formData', formData);
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

            let eduForm = [{ ...formData.edu1, ...{ degreeLevel: 1 } }];
            formData?.edu2
              ? (eduForm = [
                  ...eduForm,
                  { ...formData.edu2, ...{ degreeLevel: 2 } },
                ])
              : null;

            formData?.edu3
              ? (eduForm = [
                  ...eduForm,
                  { ...formData.edu3, ...{ degreeLevel: 3 } },
                ])
              : null;

            formData?.edu4
              ? (eduForm = [
                  ...eduForm,
                  { ...formData.edu4, ...{ degreeLevel: 4 } },
                ])
              : null;

            const payload = {
              ...userInfo,
              ...{
                addressinfo: JSON.stringify([formData.addr1, formData.addr2]),
              },
              ...{ eduinfo: JSON.stringify(eduForm) },
              ...{ refperson: JSON.stringify(refperson) },
              ...{ otherreason: JSON.stringify(otherreason) },
            };
            return this.requestService.createRequest(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.requestNumber = res.id;
        }
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

const files = [
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
