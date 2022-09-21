import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { getCookie } from '@ksp/shared/utility';
import { DegreeCertRequestService, UniRequestInsertType } from './degree-cert-request.service';

@Component({
  templateUrl: './degree-cert-request.component.html',
  styleUrls: ['./degree-cert-request.component.scss'],
})
export class DegreeCertRequestComponent {
  @ViewChild('stepper') private stepper?: MatStepper;

  step1DegreeType = '';

  step1Form = this.fb.group({
    step1: [{}, Validators.required],
  });
  step2Form = this.fb.group({
    step2: ['', Validators.required],
  });
  step3Form = this.fb.group({
    step3: ['', Validators.required],
  });
  disabledInputsStep1: any = {
    institutionsGroup: true,
    institutionsCode: true,
    institutionsName: true,
    provience: true,
  };
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private degreeCertRequestService: DegreeCertRequestService
  ) {
    this.initForm();
  }
  initForm() {
    this.degreeCertRequestService
      .universitySelectById(getCookie('uniType'))
      .subscribe((data) => {
        this.step1Form.setValue({
          step1: {
            institutionsCode: data?.universitycode || '',
            institutionsGroup: getCookie('uniType') || '',
            institutionsName: data?.name || '',
            provience: data?.provinceid || '',
          },
        });
      });
  }
  navigateBack() {
    this.router.navigate(['/', 'degree-cert']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.degreeCertRequestService.uniRequestInsert(this._getRequest()).subscribe((res) => {
          console.log(res);
          if (res?.returncode == 99) return;
          this.showConfirmDialog();
        })
      }
    });
  }
  private _getRequest(): UniRequestInsertType {
    const step1:any = this.step1Form.value.step1;
    const reqBody: UniRequestInsertType = {
      uniname: step1?.institutionsName,
      unitype: step1?.institutionsGroup,
      uniprovince: step1?.provience,
      unicode: step1?.institutionsCode,
      degreelevel: step1?.degreeTypeForm?.degreeType,
      courseacademicyear: step1?.degreeTypeForm?.courseYear,
      coursename: step1?.degreeTypeForm?.courseName,
      coursetype: step1?.degreeTypeForm?.courseType,
      coursestatus: step1?.degreeTypeForm?.courseStatus,
      fulldegreenameth: step1?.degreeTypeForm?.degreeNameThFull,
      shortdegreenameth: step1?.degreeTypeForm?.degreeNameThShort,
      fulldegreenameen: step1?.degreeTypeForm?.degreeNameEnFull,
      shortdegreenameen: step1?.degreeTypeForm?.degreeNameEnShort,
      courseapprovetime: step1?.degreeTypeForm?.courseApproveTime,
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate,
      coursedetailtype: step1?.courseDetailType,
      teachinglocation: JSON.stringify(step1?.locations),
      responsibleunit: JSON.stringify(step1?.institutions),
      evaluatelocation: JSON.stringify(step1?.locations2),
      coordinatorinfo: JSON.stringify(step1?.coordinator),
    };
    return reqBody;
  }
  showConfirmDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : 12 มกราคม 2565?
        เลขที่ใบคำขอ : UNIUS 6406000162`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
  goBack() {
    this.stepper?.previous();
  }

  goForward() {
    console.log('step1Form', this.step1Form.value);
    console.log('step2Form', this.step2Form.value);
    console.log('step3Form', this.step3Form.value);

    // this.stepper?.next();
  }
}
