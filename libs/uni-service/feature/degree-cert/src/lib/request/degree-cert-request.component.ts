import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveStepStatusOption } from '@ksp/shared/constant';

import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import {
  getCookie,
  thaiDate,
  parseJson,
  formatDate,
  formatRequestNo,
} from '@ksp/shared/utility';
import _ from 'lodash';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
@Component({
  templateUrl: './degree-cert-request.component.html',
  styleUrls: ['./degree-cert-request.component.scss'],
})

export class DegreeCertRequestComponent implements OnInit, AfterContentChecked {
  @ViewChild('stepper') private stepper?: MatStepper;
  id?: string;
  requestNo = '';
  date = thaiDate(new Date());

  step1DegreeType!: string;

  step1Form: any = this.fb.group({
    step1: [],
    detail: []
  });
  step2Form: any = this.fb.group({
    step2: [
      {
        plans: [],
      },
    ],
    detail: []
  });
  step3Form: any = this.fb.group({
    step3: [],
    detail: []
  });
  step4Form: any = this.fb.group({
    step4: [{ files: [] }],
    detail: []
  });
  uniData: any;
  mode: any = 'view';
  submode = 'create';
  status = '';
  process = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private uniRequestService: UniRequestService,
    private activatedRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.initForm();
  }

  mapCheckResult(data: any) {
    const result: any = _.find(ApproveStepStatusOption, {
      value: Number(data)
    });
    return result?.name;
  }

  async initForm() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    let uniRequestDegree: any;
    this.uniData = await lastValueFrom(
      this.uniInfoService.univerSitySelectById(getCookie('uniId'))
    );

    if (this.id) {
      uniRequestDegree = await lastValueFrom(
        this.uniInfoService.uniRequestDegreeCertSelectById(this.id)
      );
      let modeFile = 'edit';
      const editComment = await lastValueFrom(
        this.uniInfoService.getRequestProcessHistory({ requestid: this.id})
      );
      const editdetail = editComment.datareturn.find((data: any) => { 
        return data.status == uniRequestDegree.requeststatus && data.process == uniRequestDegree.requestprocess});
      if ((uniRequestDegree.requeststatus == '1' && uniRequestDegree.requestprocess == '99') ||
          (uniRequestDegree.requeststatus == '2' && uniRequestDegree.requestprocess == '1') ||
          (uniRequestDegree.requeststatus == '2' && uniRequestDegree.requestprocess == '3') ||
          (uniRequestDegree.requeststatus == '3' && uniRequestDegree.requestprocess == '4') ||
          (uniRequestDegree.requeststatus == '3' && uniRequestDegree.requestprocess == '5')) {
            this.mode = 'edit';
            modeFile = 'reject';
      }
      if (uniRequestDegree.requestprocess != '99') {
        this.submode = 'return';
      }
      this.status = uniRequestDegree.requeststatus;
      this.process = uniRequestDegree.requestprocess;
      const checkresult = uniRequestDegree.checkresult ? parseJson(uniRequestDegree.checkresult) : {};
      const { requestNo, step1, step2, step3, step4 } = await
        this.uniInfoService.mappingUniverSitySelectByIdWithForm(
          uniRequestDegree
        );
      this.requestNo = requestNo;
      if (uniRequestDegree.requeststatus == '3' && uniRequestDegree.requestprocess == '4') {
        const parsedetail = parseJson(editdetail.detail);
        this.step1Form.setValue({
          step1: step1,
          detail: parsedetail.verify?.result && parsedetail.verify?.result != '1' ? [
            this.mapCheckResult(parsedetail.verify?.result),
            'หมายเหตุ ' + (parsedetail.verify?.detail ? parsedetail.verify?.detail : ''),
          ] : []
        });
      } else {
        this.step1Form.setValue({
          step1: step1,
          detail: checkresult?.verifyStep1?.result && checkresult?.verifyStep1?.result != '1' ? [
            this.mapCheckResult(checkresult?.verifyStep1?.result),
            'หมายเหตุ ' + (checkresult?.verifyStep1?.detail ? checkresult?.verifyStep1?.detail : ''),
          ] : []
        });
      }
      if (uniRequestDegree.requeststatus == '2' && uniRequestDegree.requestprocess == '3') {
        const parsedetail = parseJson(editdetail.detail);
        this.step2Form.setValue({
          step2: step2,
          detail: parsedetail.verify?.result && parsedetail.verify?.result != '1' ? [
            this.mapCheckResult(parsedetail.verify?.result),
            'หมายเหตุ ' + (parsedetail.verify?.detail ? parsedetail.verify?.detail : ''),
          ] : []
        });
      } else {
        this.step2Form.setValue({
          step2: step2,
          detail: checkresult?.verifyStep2?.result && checkresult?.verifyStep2?.result != '1' ? [
            this.mapCheckResult(checkresult?.verifyStep2?.result),
            'หมายเหตุ ' + (checkresult?.verifyStep2?.detail ? checkresult?.verifyStep2?.detail : ''),
          ] : []
        });
      }
      this.step3Form.setValue({
        step3: step3,
        detail: checkresult?.verifyStep3?.result && checkresult?.verifyStep3?.result != '1' ? [
          this.mapCheckResult(checkresult?.verifyStep3?.result),
          'หมายเหตุ ' + (checkresult?.verifyStep3?.detail ? checkresult?.verifyStep3?.detail : ''),
        ] : []
      });
      setTimeout(() => {
        this.step4Form.setValue({
          step4: modeFile == 'edit' ? step4 : checkresult.filedetail ? checkresult.filedetail : step4,
          detail: checkresult?.verifyStep4?.result && checkresult?.verifyStep4?.result != '1' ? [
            this.mapCheckResult(checkresult?.verifyStep4?.result),
            'หมายเหตุ ' + (checkresult?.verifyStep4?.detail ? checkresult?.verifyStep4?.detail : ''),
          ] : []
        });
      }, 500);
    } else {
      this.mode = 'edit';
      this.step1Form.setValue({
        step1: {
          institutionsCode: this.uniData?.universitycode || '',
          institutionsGroup: getCookie('uniType') || '',
          institutionsName:
            this.uniData?.name +
              (this.uniData?.campusname
                ? `, ${this.uniData?.campusname}`
                : '') || '',
          provience: this.uniData?.provinceid || '',
        },
        detail: []
      });
    }
  }
  navigateBack() {
    this.router.navigate(['/', 'degree-cert']);
  }

  save(process: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe(async (e) => {
      if (e) {
        if (this.id) {
          let currentprocess = '';
          if (this.process != '1' && this.process != '99') {
            currentprocess = this.process;
          } else {
            currentprocess = process;
          }
          const emailForm = this.step1Form.value;
          this.uniRequestService.uniRequestUpdate(
            this._getRequest(currentprocess, '1')
          ).subscribe((res: any) => {
            if (emailForm.step1.coordinator && emailForm.step1.coordinator.email) {
              this.uniRequestService.kspSendEmailUni(
                {
                  fromname: 'ksplicense',
                  subject: 'ขอรับรองปริญญาและประกาศนียบัตร',
                  body: `ขอรับรองปริญญาและประกาศนียบัตร เลขที่คำขอ: ${res?.requestno}`,
                  emailaddress: emailForm.step1.coordinator.email
                }
              ).subscribe((resEmail: any) => {
                if (res?.returncode == 99) return;
                this.showConfirmDialog(res?.requestno);
              })
            } else {
              if (res?.returncode == 99) return;
              this.showConfirmDialog(res?.requestno);
            }
          });
        } else {
          const emailForm = this.step1Form.value;
          this.uniRequestService.uniRequestInsert(
            this._getRequest(process, '1')
          ).subscribe((res: any) => {
            if (emailForm.step1.coordinator && emailForm.step1.coordinator.email) {
              this.uniRequestService.kspSendEmailUni(
                {
                  fromname: 'ksplicense',
                  subject: 'ขอรับรองปริญญาและประกาศนียบัตร',
                  body: `ขอรับรองปริญญาและประกาศนียบัตร เลขที่คำขอ: ${res?.requestno}`,
                  emailaddress: emailForm.step1.coordinator.email
                }
              ).subscribe((resEmail: any) => {
                if (res?.returncode == 99) return;
                this.showConfirmDialog(res?.requestno);
              })
            } else {
              if (res?.returncode == 99) return;
              this.showConfirmDialog(res?.requestno);
            }
          });
        }  
      }
    });
  }
  private _getRequest(process: string, status: string): any {
    const step1: any = this.step1Form.value.step1;
    const step2: any = this.step2Form.value.step2;
    const step3: any = this.step3Form.value.step3;
    const step4: any = this.step4Form.value.step4;
    const dateapprove = new Date(step1?.degreeTypeForm?.courseApproveDate);
    dateapprove.setHours(dateapprove.getHours() + 7);
    const dateaccept = new Date(step1?.degreeTypeForm?.courseAcceptDate);
    dateaccept.setHours(dateaccept.getHours() + 7);
    const reqBody: any = {
      uniid: getCookie('uniId'),
      ref1: '3',
      ref2: '03',
      ref3: '5',
      requestprocess: process,
      requeststatus: status,
      process: process,
      status: status,
      systemtype: '3',
      requesttype: '3',
      subtype: '5',

      attachfiles: step4 ? JSON.stringify(step4?.files) : null,
      uniname: step1?.institutionsName,
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
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate
        ? formatDate(dateapprove.toISOString())
        : null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate
        ? formatDate(dateaccept.toISOString())
        : null,
      coursedetailtype: step1?.courseDetailType || null,
      coursedetailinfo: step1?.courseDetail
        ? JSON.stringify(step1?.courseDetail)
        : null,
      teachinglocation: step1?.locations
        ? JSON.stringify(step1?.locations)
        : null,
      responsibleunit: step1?.institutions
        ? JSON.stringify(step1?.institutions)
        : null,
      evaluatelocation: step1?.locations2
        ? JSON.stringify(step1?.locations2)
        : null,
      coordinatorinfo: step1?.coordinator
        ? JSON.stringify(step1?.coordinator)
        : null,
      courseteacher: step2?.teacher?.teachers
        ? JSON.stringify(step2?.teacher?.teachers)
        : null,
      courseinstructor: step2?.nitet
        ? JSON.stringify(step2?.nitet)
        : null,
      courseadvisor: step2?.advisor?.advisors
        ? JSON.stringify(step2?.advisor?.advisors)
        : null,
      processtrainning: step3?.training?.rows
        ? JSON.stringify(step3?.training?.rows)
        : null,
      processteaching: step3?.teaching?.rows
        ? JSON.stringify(step3?.teaching?.rows)
        : null,
      tokenkey: getCookie('userToken') || null,
    };
    if (['a', 'b', 'c'].includes(this.step1DegreeType)) {
      reqBody['coursestructure'] = step2?.plan1?.plans
        ? JSON.stringify(step2?.plan1?.plans)
        : null;

      reqBody['courseplan'] = step2?.plan1?.subjects
        ? JSON.stringify(step2?.plan1?.subjects)
        : null;
    } else {
      reqBody['coursestructure'] = step2?.plan2?.plans
        ? JSON.stringify(step2?.plan2?.plans)
        : null;
      reqBody['courseplan'] = step2?.plan2?.subjects
        ? JSON.stringify({
            subjects: step2?.plan2?.subjects,
            subjectgroupname: {
              subject1GroupName: step2?.plan2?.subject1GroupName,
              subject2GroupName: step2?.plan2?.subject2GroupName,
              subject3GroupName: step2?.plan2?.subject3GroupName,
            },
          })
        : null;
    }
    if (this.id) {
      reqBody['id'] = this.id;
    }
    return reqBody;
  }
  showConfirmDialog(requestno?: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${this.date}
        เลขที่แบบคำขอ : ${requestno ? formatRequestNo(requestno || '') : formatRequestNo(this.requestNo) || '-'}`,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอหรือรหัสเข้าใช้งาน
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
    this.stepper?.next();
  }
}
