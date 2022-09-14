import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SchoolRequestType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode } from '@ksp/shared/interface';
import { GeneralInfoService, RequestLicenseService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, Observable, switchMap } from 'rxjs';
import localForage from 'localforage';

@UntilDestroy()
@Component({
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss'],
})
export class CoordinatorInfoComponent implements OnInit {
  form = this.fb.group({
    coordinator: [],
  });
  savingData: any;
  uploadFileList = ['หนังสือแต่งตั้งผู้ประสานงาน', 'สำเนาบัตรประชาชน'];
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  mode: FormMode = 'edit';
  userInfoFormdisplayMode: number = SchoolRequestType.ขอยื่นผู้ประสานงาน;
  school: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestLicenseService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    //this.savingData = history.state.data;

    this.getListData();

    localForage.getItem('registerSelectedSchool').then((res) => {
      this.school = res;
    });

    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.savingData = res;
    });
  }
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
  }
  navigateBack() {
    this.router.navigate(['login']);
  }

  back() {
    this.router.navigate(['register', 'requester']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        schoolCode: 'รหัสเข้าใช้งาน(รหัสโรงเรียน): xxxx',
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const payload = {
              ...this.savingData,
              coordinatorinfo: JSON.stringify(this.form.value),
            };
            payload.ref1 = '2';
            payload.ref2 = '01';
            payload.ref3 = '1';
            payload.systemtype = '2';
            payload.requesttype = '01';
            return this.requestLicenseService.requestLicense(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.showCompleteDialog();
        }
      });
  }

  showCompleteDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : 10 ตุลาคม  2565
        เลขที่ใบคำขอ : 12234467876543`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
}
