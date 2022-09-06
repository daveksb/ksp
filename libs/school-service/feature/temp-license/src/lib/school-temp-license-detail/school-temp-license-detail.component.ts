import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import {
  AddressService,
  GeneralInfoService,
  StaffPersonInfoService,
  TempLicenseService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { LicenseDetailService } from './school-temp-license-detail.service';

@UntilDestroy()
@Component({
  templateUrl: './school-temp-license-detail.component.html',
  styleUrls: ['./school-temp-license-detail.component.scss'],
})
export class SchoolTempLicenseDetailComponent implements OnInit {
  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
    schoolAddr: [],
    teachingInfo: [],
    hiringInfo: [],
    reason: [],
  });

  eduSelected = false;
  addrSelected = false;

  countries$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  positionTypes$!: Observable<any>;

  staffId!: number;
  schoolAddressLabel = `ที่อยู่ของสถานศึกษา
  ที่ขออนุญาต`;

  requestType = 1;
  requestTypeLabel = '';
  schoolId = '0010201056';

  educationInfo: string[] = [];
  teachingInfo: string[] = [];
  reasonInfo: string[] = [];
  evidenceFiles: string[] = [];
  prefixList$!: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: LicenseDetailService,
    private tempLicenseService: TempLicenseService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private staffService: StaffPersonInfoService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.checkStaffId();
  }

  tempSave() {
    if (!this.staffId) {
      const formData: any = this.form.getRawValue();
      formData.userInfo.schoolId = '0010201056';
      formData.userInfo.nationality = 'TH';
      formData.userInfo.createDate = new Date().toISOString();
      formData.addr1.addressType = 1;
      formData.addr2.addressType = 2;

      //console.log('formData = ', formData);
      const { hiringInfo, reason, schoolAddr, teachingInfo, ...payload } =
        formData;

      console.log('payload = ', payload);
      this.staffService.addStaff(payload).subscribe((res) => {
        console.log('add staff result = ', res);
        this.router.navigate(['/temp-license', 'detail', res.id], {
          queryParams: { type: this.requestType },
        });
      });
    }
  }

  onTabIndexChanged(tabIndex: number) {
    //this.selectedTabIndex = tabIndex;
    if (this.staffId && tabIndex === 2 && !this.eduSelected) {
      this.patchEdu(this.staffId);
      this.eduSelected = true;
    }

    /* if (this.staffId && tabIndex === 1 && !this.addrSelected) {
      this.patchAddress(this.staffId);
      this.addrSelected = true;
    } */
  }

  provinceChanged(type: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (type === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (type === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(type: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (type === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (type === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  checkStaffId() {
    this.route.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
      if (this.staffId) {
        this.patchUserInfo(this.staffId);
        this.patchAddress(this.staffId);
      }
    });
  }

  patchUserInfo(staffId: number) {
    this.staffService
      .getStaffUserInfo(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        const { id, schoolId, createDate, ...formData } = res;
        formData.birthDate = formData.birthDate.split('T')[0];
        this.form.controls.userInfo.patchValue(formData);
      });
  }

  patchAddress(staffId: number) {
    this.addressService
      .getStaffAddress(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any[]) => {
        //array of address
        res.map((addr, i) => {
          const { id, schStaffId, addressType, ...formData } = addr;
          if (i === 0) {
            this.amphurs1$ = this.addressService.getAmphurs(addr.province);
            this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.addr1.patchValue(formData);
          }
          if (i === 1) {
            this.amphurs2$ = this.addressService.getAmphurs(addr.province);
            this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.addr2.patchValue(formData);
          }
        });
      });
  }

  patchEdu(staffId: number) {
    this.staffService
      .getStaffEdu(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any[]) => {
        //console.log('get edu = ', res);
        if (res && res.length) {
          res.map((edu, i) => {
            const { id, schStaffId, ...formData } = edu;
            formData.admissionDate = formData.admissionDate.split('T')[0];
            formData.graduateDate = formData.graduateDate.split('T')[0];
            if (i === 0) {
              this.form.controls.edu1.patchValue(formData);
            }
            if (i === 1) {
              this.form.controls.edu2.patchValue(formData);
            }
          });
        }
      });
  }

  addTempLicense() {
    const payload = {
      requestNo: Date.now(),
      requestStatus: null,
      requestProcess: null,
      requestDate: new Date().toISOString().split('.')[0],
      schoolId: this.schoolId,
      staffId: '121', //this.staffId,
      idCardNo: '1234567878781',
      requestType: '1',
      updateDate: new Date().toISOString().split('.')[0],
    };
    this.tempLicenseService.addTempLicense(payload).subscribe((res) => {
      console.log('add temp license = ', res);
    });
  }

  save() {
    const dialogRef = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '850px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  searchStaff(idCard: string) {
    if (!idCard) return;
    this.tempLicenseService
      .searchStaffFromIdCard(this.schoolId, idCard)
      .subscribe((res) => {
        //console.log('res = ', res);
        if (res.returnCode === '98') {
          this.router.navigate(['/temp-license', 'detail'], {
            queryParams: { type: this.requestType },
          });
        } else
          this.router.navigate(['/temp-license', 'detail', res.id], {
            queryParams: { type: this.requestType },
          });
      });
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;

    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  getList() {
    this.updateHeaderLabel();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.educationInfo = this.service.educationInfo;
    this.teachingInfo = this.service.teachingInfo;
    this.reasonInfo = this.service.reasonInfo;
    this.evidenceFiles = this.service.evidenceFiles;
    this.provinces$ = this.addressService.getProvinces();
    this.positionTypes$ = this.staffService.getPositionTypes();
    this.countries$ = this.addressService.getCountry();
    this.tempLicenseService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        //console.log('school = ', res);
        this.form.controls.schoolAddr.patchValue(res);
      });
  }

  updateHeaderLabel() {
    this.route.queryParams.subscribe((params) => {
      if (params['type'] == 1) {
        this.requestType = 1;
        this.requestTypeLabel = '(ชาวไทย)';
      } else if (params['type'] == 2) {
        this.requestType = 2;
        this.requestTypeLabel = '(ผู้บริหารการศึกษา)';
      } else if (params['type'] == 3) {
        this.requestType = 3;
        this.requestTypeLabel = '(ชาวต่างชาติ)';
      }
    });
  }

  backToListPage() {
    this.router.navigate(['/temp-license', 'list']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
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
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          //this.backToListPage();
          this.addTempLicense();
        }
      });
  }
}
