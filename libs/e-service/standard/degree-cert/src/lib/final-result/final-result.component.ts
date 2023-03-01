import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import {
  ERequestService,
  EUniService,
  UniInfoService,
} from '@ksp/shared/service';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import {
  formatDate,
  getCookie,
  jsonStringify,
  parseJson,
} from '@ksp/shared/utility';
import _ from 'lodash';
import moment from 'moment';
import { EUniApproveProcess } from '@ksp/shared/constant';

const detailToState = (res: any) => {
  const dataReturn = _.filter(
    res?.datareturn,
    ({ process }: any) => ['6'].includes(process)
  ).map((data: any) => {
    return { ...data, detail: parseJson(data?.detail)};
  });
  return dataReturn;
};
const mapProcess = (data: any) => {
  let status: any = _.find(EUniApproveProcess, {
    requestType: 3,
    processId: _.toNumber(data.process),
  });
  status = _.find(status?.status, {
    id: _.toNumber(data.status),
  });
  return status.sname;
}
@Component({
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss'],
})
export class FinalResultComponent implements OnInit {
  form = this.fb.group({
    finalResult: [
      {
        reasonTimes: '',
        date: '',
        approvedegreeCode: '',
      },
    ],
    step1: [],
  });
  allowEdit = false;
  daftRequest: any;
  requestNumber = '';
  uniRequestDegreeCert: any = '';
  step1Data: any = {};
  formData: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private uniInfoService: UniInfoService,
    private eUniService: EUniService,
    private eRequestService: ERequestService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getHistory();
    this.getDegreeCert();
  }
  getHistory() {
    if (this.route.snapshot.params['key']) {
      this.eRequestService
        .kspUniRequestProcessSelectByRequestId(
          this.route.snapshot.params['key']
        )
        .pipe(map(detailToState))
        .subscribe((res) => {
          const lastResult = _.last(res?.filter((data: any) => {
            return data.process == 6 && data.detail && data.detail.finalResult})) as any;
          const data = lastResult ? lastResult.detail : {};
          if (data && data.finalResult) {
            this.form.patchValue({
              finalResult: {
                reasonTimes: data.finalResult.reasonTimes,
                date: data.finalResult.date,
                approvedegreeCode: data.degreeApproveCode,
              },
            })
          }
          // this.getDegreeCert(res?.uniDegreeCertId, uniRequestRes?.requestprocess);
      });
    }
  }
  getDegreeCert() {
    const id = this.route.snapshot.params['key'];
    if (id) {
      this.eUniService
        .uniRequestDegreeCertSelectById(id)
        .pipe(
          map((res) => {
            this.daftRequest = res;
            this.allowEdit = res.requestprocess === '5';
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          if (res?.returncode !== 98) {
            this.requestNumber = res?.requestNo;
            this.step1Data = res?.step1;
            this.formData = res;
            this.form.patchValue({
              step1: res.step1
            });
            this.generateDegreeApproveCode();
          }
        });
    } else {
      this.allowEdit = false;
    }
  }

  generateDegreeApproveCode() {
    if (this.daftRequest.requestprocess == '5') {
      this.eUniService
      .genDegreeApproveCode({ coursestatus: this.daftRequest.requeststatus })
      .subscribe((res) => {
        if (res?.returncode !== 98) {
          this.daftRequest.degreeapprovecode = res.degreeapprovecode;
          this.form.controls.finalResult.patchValue({
            approvedegreeCode: res.degreeapprovecode,
            reasonTimes: '',
            date: '',
          })
        }
      });
    }
  }
  
  cancel() {
    this.location.back();
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันรหัสรับรองปริญญา
        และประกาศนียบัตรทางการศึกษา ใช่หรือไม่`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onSubmitDegreeCert();
        // this.onSubmitKSP();
      }
    });
  }

  onSubmitDegreeCert() {
    this.eUniService
      .uniDegreeCertInsert(this._getRequest())
      .subscribe((res) => {
        this.onSubmitKSP(res?.degreeapprovecode, res?.id);
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'ระบบสร้างรหัส',
        subTitle: `รับรองปริญญา และประกาศนียบัตร
        ทางการศึกษาเรียบร้อย ตรวจสอบข้อมูลได้ที่`,
        schoolCode: `"ทะเบียนปริญญา
        และประกาศนียบัตรทางการศึกษา"`,
      },
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list', '0']);
      }
    });
  }
  private _getRequest(): any {
    const step1: any = this.formData.step1;
    const step2: any = this.formData.step2;
    const step3: any = this.formData.step3;
    const step4: any = this.formData.step4;
    const reqBody: any = {
      degreeapprovecode: this.daftRequest?.degreeapprovecode || null,
      coursesubjects: this.daftRequest?.coursesubjects || null,
      coursemajor: this.daftRequest?.coursemajor || null,
      requestno: this.daftRequest?.requestno || null,
      requestid: this.daftRequest?.requestid || null,
      requestdate: moment(this.daftRequest?.requestdate).format("YYYY-MM-DD[T]HH:mm:ss"),
      uniid: this.daftRequest?.uniid || null,
      attachfiles: step4 ? JSON.stringify(step4?.files) : null,
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
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate
        ? formatDate(
            new Date(step1?.degreeTypeForm?.courseApproveDate).toISOString()
          )
        : null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate
        ? formatDate(
            new Date(step1?.degreeTypeForm?.courseAcceptDate).toISOString()
          )
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
      courseinstructor: step2?.nitet?.nitets
        ? JSON.stringify(step2?.nitet?.nitets)
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
    if (['1', '2', '3', '4'].includes(this.daftRequest?.degreelevel)) {
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
            subject3GroupName: step2?.plan2?.subject3GroupName
          }
        })
        // JSON.stringify(step2?.plan2?.subjects)
        : null;
    }
    return reqBody;
  }
  private _getRequestUpdate(process: string, status: string, degreeApproveCode: string): any {
    const step1: any = this.formData.step1;
    const step2: any = this.formData.step2;
    const step3: any = this.formData.step3;
    const step4: any = this.formData.step4;

    const dateapprove = new Date(step1?.degreeTypeForm?.courseApproveDate);
    dateapprove.setHours(dateapprove.getHours() + 7);
    const dateaccept = new Date(step1?.degreeTypeForm?.courseAcceptDate);
    dateaccept.setHours(dateaccept.getHours() + 7);
    const reqBody: any = {
      uniid: this.daftRequest.uniid,
      ref1: '3',
      ref2: '03',
      ref3: '5',
      requestprocess: process,
      requeststatus: status,
      process: process,
      status: status,
      systemtype: this.daftRequest.systemtype,
      requesttype: this.daftRequest.requesttype,
      subtype: '5',
      degreeapprovecode: degreeApproveCode || null,
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
    if (['1', '2', '3', '4'].includes(this.daftRequest?.degreelevel)) {
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
            subject3GroupName: step2?.plan2?.subject3GroupName
          }
        })
        : null;
    }
    reqBody['id'] = this.daftRequest.id;
    return reqBody;
  }

  onSubmitKSP(degreeApproveCode: any, uniDegreeCertId: any) {
    // if (!degreeApproveCode || !uniDegreeCertId)
      // return this.onConfirmed('บันทึกข้อมูลไม่สำเร็จ');
    const detail: any = _.pick(this.form.value, ['verify', 'approveData']);
    const payload: any = {
      systemtype: '3',
      requestid: this.daftRequest?.requestid,
      userid: getCookie('userId'),
      process: '6',
    };
    payload.status = '1';
    payload.detail = jsonStringify({
      ...detail,
      finalResult: this.form.value.finalResult,
      degreeApproveCode: degreeApproveCode,
      uniDegreeCertId: uniDegreeCertId,
    });
    this.eUniService
    .uniRequestDegreeCertUpdate(this._getRequestUpdate(payload.process, payload.status, degreeApproveCode))
    .subscribe(() => {
      this.eRequestService
      .kspUpdateRequestUniRequestDegree(payload)
      .subscribe(() => {
        this.onConfirmed();
      });
    });
  }
}
