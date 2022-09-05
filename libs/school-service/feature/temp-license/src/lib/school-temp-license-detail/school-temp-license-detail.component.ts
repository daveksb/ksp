import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mergeMap, Observable, withLatestFrom } from 'rxjs';
import { TempLicenseService } from '../temp-license.service';
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
    schoolAddr: [],
    edu1: [],
    edu2: [],
    teaching: [],
    reason: [],
  });

  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;

  staffId!: number;
  schoolAddressLabel = `ที่อยู่ของสถานศึกษา
  ที่ขออนุญาต`;

  requestTypeLabel = '';
  selectedTabIndex = 0;
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
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  addTempLicense() {
    const payload = {
      requestNo: 'test-request-no',
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

  /*   save() {
    const dialogRef = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '850px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  } */

  searchStaff(idCard: string) {
    const userInfo$ = this.tempLicenseService.searchIdCard(
      this.schoolId,
      idCard
    );

    userInfo$
      .pipe(
        untilDestroyed(this),
        mergeMap((res) => this.addressService.getStaffAddress(res.id)),
        withLatestFrom(userInfo$)
      )
      .subscribe((res) => {
        //console.log('res = ', res);
        const addresses: any[] = res[0];
        const userInfo = res[1];
        this.staffId = userInfo.id;
        const { id, schoolId, createDate, ...searchResult } = userInfo;
        console.log('search result = ', searchResult);
        this.form.controls.userInfo.patchValue(searchResult);

        addresses.map((addr, i) => {
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

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  onTabIndexChanged(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  updateHeaderLabel() {
    this.route.queryParams.subscribe((params) => {
      if (params['type'] == 1) {
        this.requestTypeLabel = '(ชาวไทย)';
      } else if (params['type'] == 2) {
        this.requestTypeLabel = '(ผู้บริหารการศึกษา)';
      } else if (params['type'] == 3) {
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

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
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

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.backToListPage();
      }
    });
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.educationInfo = this.service.educationInfo;
    this.teachingInfo = this.service.teachingInfo;
    this.reasonInfo = this.service.reasonInfo;
    this.evidenceFiles = this.service.evidenceFiles;
    this.updateHeaderLabel();
    this.provinces$ = this.addressService.getProvinces();
    this.tempLicenseService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        //console.log('school = ', res);
        const { letterNumber, ...form } = res;
        this.form.controls.schoolAddr.patchValue(form);
      });
  }
}
