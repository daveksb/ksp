import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import { getCookie, thaiDate } from '@ksp/shared/utility';
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
    private uniInfoService: UniInfoService,
    private uniRequestService: UniRequestService
  ) {
    this.initForm();
  }
  initForm() {
    this.uniInfoService
      .univerSitySelectById(getCookie('uniType'))
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
        this.uniRequestService
          .uniRequestInsert(this._getRequest())
          .subscribe((res) => {
            if (res?.returncode == 99) return;
            this.showConfirmDialog(res?.requestno);
          });
      }
    });
  }
  private _getRequest():any {
    const step1: any = this.step1Form.value.step1;
    const step2: any = this.step2Form.value.step2;
    const step3: any = this.step3Form.value.step3;

    const reqBody:any = {
      uniname: step1?.institutionsName || null,
      unitype: step1?.institutionsGroup || null,
      uniprovince: step1?.provience || null,
      unicode: step1?.institutionsCode || null,
      degreelevel: step1?.degreeTypeForm?.degreeType || null,
      courseacademicyear: step1?.degreeTypeForm?.courseYear || null,
      coursename: step1?.degreeTypeForm?.courseName || null,
      coursetype: step1?.degreeTypeForm?.courseType || null,
      coursestatus: step1?.degreeTypeForm?.courseStatus || null,
      fulldegreenameth: step1?.degreeTypeForm?.degreeNameThFull || null,
      shortdegreenameth: step1?.degreeTypeForm?.degreeNameThShort || null,
      fulldegreenameen: step1?.degreeTypeForm?.degreeNameEnFull || null,
      shortdegreenameen: step1?.degreeTypeForm?.degreeNameEnShort || null,
      courseapprovetime: step1?.degreeTypeForm?.courseApproveTime || null,
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate || null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate || null,
      coursedetailtype: step1?.courseDetailType || null,
      teachinglocation: JSON.stringify(step1?.locations) || null,
      responsibleunit: JSON.stringify(step1?.institutions) || null,
      evaluatelocation: JSON.stringify(step1?.locations2) || null,
      coordinatorinfo: JSON.stringify(step1?.coordinator) || null,
      coursestructure: JSON.stringify(step2?.plan1?.plans) || null,
      courseplan: JSON.stringify(step2?.plan1?.subjects) || null,
      courseteacher: JSON.stringify(step2?.teacher?.teachers) || null,
      courseinstructor: JSON.stringify(step2?.nitet?.nitets) || null,
      courseadvisor: JSON.stringify(step2?.advisor?.advisors) || null,
      processtrainning: JSON.stringify(step3?.training?.rows) || null,
      processteaching: JSON.stringify(step3?.teaching?.rows) || null,
      tokenkey: getCookie('userToken') || null,
    };
    return reqBody;
  }
  showConfirmDialog(requestno?: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${requestno || '-'}`,
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
