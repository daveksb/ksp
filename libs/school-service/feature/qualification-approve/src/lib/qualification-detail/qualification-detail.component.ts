import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolRequestType, UserInfoFormType } from '@ksp/shared/constant';
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
  RequestLicenseService,
} from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'ksp-qualification-detail',
  templateUrl: './qualification-detail.component.html',
  styleUrls: ['./qualification-detail.component.scss'],
})
export class QualificationDetailComponent implements OnInit {
  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    education: [],
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
  requestId!: number;
  otherreason: any;
  refperson: any;
  evidenceFiles = [
    'หนังสือนำส่งจากหน่วยงานผู้ใช้',
    'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    'สำเนาทะเบียนบ้าน',
    'สำเนา กพ.7 / สมุดประจำตัว',
    'สำเนาหนังสือแจ้งการเทียบคุณวุฒิ (กรณีจบการศึกษาจากต่างประเทศ)',
    'สำเนาหลักฐานการเปลี่ยนชื่อ นามสกุล',
    'เอกสารอื่นๆ',
  ];
  mode!: FormMode;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestLicenseService: RequestLicenseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestData(this.requestId);
      }
    });
  }

  loadRequestData(id: number) {
    this.requestLicenseService.getRequestById(id).subscribe((res: any) => {
      if (res) {
        this.requestNumber = res.requestno;
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
    this.router.navigate(['/temp-license', 'list']);
  }

  onSave() {
    if (!this.form.get('userInfo')?.valid) return;
    if (!this.form.get('addr1')?.valid) return;
    if (!this.form.get('addr2')?.valid) return;
    if (!this.form.get('education')?.valid) return;
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
            userInfo.schoolId = this.schoolId;
            userInfo.ref1 = '2';
            userInfo.ref2 = '06';
            userInfo.ref3 = '1';
            userInfo.systemtype = '2';
            userInfo.requesttype = '06';
            const payload = {
              ...userInfo,
              ...{
                addressinfo: JSON.stringify([formData.addr1, formData.addr2]),
              },
              ...{ eduinfo: JSON.stringify([formData.education]) },
              ...{ refperson: JSON.stringify(refperson) },
              ...{ otherreason: JSON.stringify(otherreason) },
            };
            return this.requestLicenseService.requestLicense(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.onCompleted();
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
        this.cancel();
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
