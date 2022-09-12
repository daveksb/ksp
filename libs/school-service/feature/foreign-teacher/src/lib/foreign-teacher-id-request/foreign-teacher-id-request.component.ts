import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable, switchMap } from 'rxjs';
import {
  AddressService,
  GeneralInfoService,
  RequestLicenseService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { thaiDate } from '@ksp/shared/utility';
@UntilDestroy()
@Component({
  templateUrl: './foreign-teacher-id-request.component.html',
  styleUrls: ['./foreign-teacher-id-request.component.scss'],
})
export class ForeignTeacherIdRequestComponent implements OnInit {
  form = this.fb.group({
    foreignTeacher: [],
    visainfo: [],
  });
  bureauName = '';
  schoolId = '0010201056';
  schoolName = '';
  address = '';
  requestDate = thaiDate(new Date());
  mode: FormMode = 'edit';
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];
  requestNumber = '';
  requestId!: number;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestLicenseService: RequestLicenseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getList();
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
        this.mode = 'view';
        this.requestNumber = res.requestno;
        res.birthdate = res.birthdate?.split('T')[0];
        res.passportstartdate = res.passportstartdate?.split('T')[0];
        res.passportenddate = res.passportenddate?.split('T')[0];
        const visainfo = JSON.parse(atob(res.visainfo));
        visainfo.passportenddate = visainfo.passportenddate?.split('T')[0];
        this.form.get('foreignTeacher')?.patchValue(res);
        this.form.controls['visainfo'].patchValue(visainfo);
      }
    });
  }

  cancel() {
    this.router.navigate(['/temp-license']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });
    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            // call API
            const userInfo = this.form.value.foreignTeacher as any;
            userInfo.ref1 = '2';
            userInfo.ref2 = '04';
            userInfo.ref3 = '1';
            userInfo.systemtype = '2';
            userInfo.requesttype = '3';
            userInfo.schoolid = this.schoolId;
            userInfo.visainfo = JSON.stringify(this.form.value.visainfo);
            return this.requestLicenseService.requestLicense(userInfo);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.onCompleted();
        console.log(res);
      });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
  getList() {
    this.requestLicenseService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.schoolName = res.schoolName;
        this.bureauName = res.bureauName;
        this.address = `บ้านเลขที่ ${res.address} ซอย ${
          res?.street ?? ''
        } หมู่ ${res?.moo ?? ''} ถนน ${res?.road ?? ''} ตำบล ${
          res.tumbon
        } อำเภอ ${res.amphurName} จังหวัด ${res.provinceName}`;
      });
    this.countries$ = this.addressService.getCountry();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }
}
