import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
import { createDefaultRequestForm, thaiDate } from '@ksp/shared/utility';
@UntilDestroy()
@Component({
  templateUrl: './foreign-teacher-id-request.component.html',
  styleUrls: ['./foreign-teacher-id-request.component.scss'],
})
export class ForeignTeacherIdRequestComponent implements OnInit {
  form = this.fb.group({
    foreignTeacher: [],
  });
  requestNumber = '';
  requestDate = thaiDate(new Date());
  schoolId = '0010201056';
  @Input() mode: FormMode = 'edit';
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestLicenseService: RequestLicenseService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.form.valueChanges.subscribe((res) => {
      console.log('res = ', res);
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
            //call API
            const form = createDefaultRequestForm(this.fb);
            form.patchValue(this.form.value.foreignTeacher as any);
            return this.requestLicenseService.requestLicense(form.value);
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
        console.log('school = ', res);
      });
    this.countries$ = this.addressService.getCountry();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }
}
