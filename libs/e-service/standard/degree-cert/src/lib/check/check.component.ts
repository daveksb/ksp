import { jsonStringify, parseJson, getCookie, formatDate, thaiDate } from '@ksp/shared/utility';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  ERequestService,
  EUniService,
  UniInfoService,
} from '@ksp/shared/service';
import { map } from 'rxjs';
import _ from 'lodash';
import { Location } from '@angular/common';

import { ApproveStepStatusOption } from '@ksp/shared/constant';
import { MatStepper } from '@angular/material/stepper';
const detailToState = (res: any) => {
  const newRes = _.filter(res?.datareturn, ({ process }) =>
    ['1', '2', '3'].includes(process)
  ).map((data: any) => {
    return {
      ...data,
      detail: parseJson(data?.detail),
    };
  });
  const filterRes = _.filter(
    newRes,
    (data: any) => !data?.detail?.considerCourses
  )?.map((data: any) => {
    const verifyObject: any = {};
    verifyObject.isBasicValid =
      _.get(data, 'detail.verifyStep1.result') === '1';
    verifyObject.isCourseValid =
      _.get(data, 'detail.verifyStep2.result') === '1';
    verifyObject.isProcessValid =
      _.get(data, 'detail.verifyStep3.result') === '1';
    verifyObject.isAttachmentValid =
      _.get(data, 'detail.verifyStep4.result') === '1';
    verifyObject.createDate = data?.createdate;
    verifyObject.updateBy = data?.fullnameth;
    return verifyObject;
  });
  return { newres: filterRes || [], res: newRes };
};
@Component({
  selector: 'e-service-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent implements OnInit, AfterContentChecked {
  @ViewChild('stepper') private stepper?: MatStepper;
  form: any = this.fb.group<any>({
    step1: [],
    step2: [
      {
        plans: [],
      },
    ],
    step3: [],
    step4: [],
    step5: [
      {
        verify: null,
        returnDate: '',
        forward: null,
      },
    ],
    verifyStep1: [],
    verifyStep2: [],
    verifyStep3: [],
    verifyStep4: [],
    historyStep1: [],
    historyStep2: [],
    historyStep3: [],
    historyStep4: [],
  });
  verifyResult: {
    isBasicValid: boolean;
    isCourseValid: boolean;
    isAttachmentValid: boolean;
    isProcessValid: boolean;
    createDate: string;
    updateBy: string;
  }[] = [];
  requestNumber = '';
  degreeType = '';
  choices = ApproveStepStatusOption;
  daftRequest: any;
  disabledVerifyStep = false;
  submode = 'return';
  historyResult: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private eUniService: EUniService,
    private eRequestService: ERequestService,
    private cdref: ChangeDetectorRef,
    private location: Location
  ) {}
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
  getHistory() {
    this.eRequestService
      .kspUniRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        this.verifyResult = res.res;
        this.historyResult = res.res.filter((data: any) => {
          return data.process == '1' && data.status == '2'
        });
        const step1history = [] as any;
        const step2history = [] as any;
        const step3history = [] as any;
        const step4history = [] as any;
        this.historyResult.forEach((data: any) => {
          const findResult1 = this.choices.find(choice=>{return choice.value == data.detail.verifyStep1.result });
          const findResult2 = this.choices.find(choice=>{return choice.value == data.detail.verifyStep2.result });
          const findResult3 = this.choices.find(choice=>{return choice.value == data.detail.verifyStep3.result });
          const findResult4 = this.choices.find(choice=>{return choice.value == data.detail.verifyStep4.result });
          step1history.push({
            resultname: findResult1 ? findResult1?.name : '',
            comment: data.detail.verifyStep1.detail || '',
            createdate: thaiDate(new Date(data.createdate)),
            fullnameth: data.fullnameth
          });
          step2history.push({
            resultname: findResult2 ? findResult2?.name : '',
            comment: data.detail.verifyStep2.detail || '',
            createdate: thaiDate(new Date(data.createdate)),
            fullnameth: data.fullnameth
          });
          step3history.push({
            resultname: findResult3 ? findResult3?.name : '',
            comment: data.detail.verifyStep3.detail || '',
            createdate: thaiDate(new Date(data.createdate)),
            fullnameth: data.fullnameth
          });
          step4history.push({
            resultname: findResult4 ? findResult4?.name : '',
            comment: data.detail.verifyStep4.detail || '',
            createdate: thaiDate(new Date(data.createdate)),
            fullnameth: data.fullnameth
          });
        });
        this.form.patchValue({
          historyStep1: step1history,
          historyStep2: step2history,
          historyStep3: step3history,
          historyStep4: step4history,
        })
        const lastPlan = _.last(
          res?.res.filter((data) => {
            return data.process == 3;
          })
        ) as any;
        this.form.patchValue({
          verifyStep1: lastPlan?.detail.verifyStep1,
          verifyStep2: lastPlan?.detail.verifyStep2,
          verifyStep3: lastPlan?.detail.verifyStep3,
          verifyStep4: lastPlan?.detail.verifyStep4,
        });
      });
  }
  getDegreeCert() {
    if (this.route.snapshot.params['key']) {
      this.eUniService
        .uniRequestDegreeCertSelectById(this.route.snapshot.params['key'])
        .pipe(
          map((res) => {
            this.daftRequest = res;
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          if (res?.returncode !== 98) {
            this.requestNumber = res?.requestNo;
            this.form.patchValue({
              step1: res.step1,
              step2: res.step2,
              step3: res.step3,
              step4: res.step4,
            });
            if (res?.requestprocess == '3' && res?.requeststatus == '1') {
              this.disabledVerifyStep = true;
            }
          }
        });
    }
  }
  get allowEdit() {
    return (
      ['1', '2'].includes(this.daftRequest?.requestprocess) &&
      this.daftRequest?.requeststatus !== '2'
    );
  }
  ngOnInit(): void {
    this.getHistory();
    this.getDegreeCert();
  }

  private _getRequest(process: string, status: string): any {
    const step1: any = this.form.value.step1;
    const step2: any = this.form.value.step2;
    const step3: any = this.form.value.step3;
    const step4: any = this.form.value.step4;

    const dateapprove = new Date(step1?.degreeTypeForm?.courseApproveDate);
    dateapprove.setHours(dateapprove.getHours() + 7)
    const dateaccept = new Date(step1?.degreeTypeForm?.courseAcceptDate);
    dateaccept.setHours(dateaccept.getHours() + 7)
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
        ? formatDate(
            dateapprove.toISOString()
          )
        : null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate
        ? formatDate(
            dateaccept.toISOString()
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
      coursestructure: step2?.coursestructure,
      courseplan: step2?.courseplan
    };

    reqBody['id'] = this.daftRequest.id;
    return reqBody;
  }

  cancel() {
    this.router.navigate(['/', 'degree-cert', 'list', 0]);
  }
  onSubmitKSP() {
    const verify = _.get(this.form, 'value.step5.verify', '');
    const detail: any = _.pick(this.form.value, [
      'verifyStep1',
      'verifyStep2',
      'verifyStep3',
      'verifyStep4',
    ]);

    console.log(detail)
    let process: any;
    let status: any;
    if (verify == 1) {
      process = _.toNumber(this.daftRequest?.requestprocess) + 2;
      status = 1;
    } else if (verify == 2) {
      process = _.toNumber(this.daftRequest?.requestprocess);
      status = 2;
    }

    try {
      
      const payload: any = {
        systemtype: '3',
        requestid: this.daftRequest?.requestid,
        userid: getCookie('userId'),
      };
      detail.returnDate = _.get(this.form, 'value.step5.returnDate', '');
      payload.status = status;
      payload.process = process;
      payload.requeststatus = status;
      payload.requestprocess = process;
      payload.detail = jsonStringify({...detail, filedetail: _.get(this.form, 'value.step4', '')});
      this.eRequestService
        .kspUpdateRequestUniRequestDegree(payload)
        .subscribe(() => {
          // this.updateDegreeRequest(process, status);
          this.onConfirmed();
        });
    } catch (error) {
      console.log(error);
    }
  }

  updateDegreeRequest(reqProcess: any, reqStatus: any) {
    const payload = this._getRequest(reqProcess, reqStatus);
    payload.process = reqProcess;
    payload.status = reqStatus;
    payload.requestprocess = reqProcess;
    payload.requeststatus = reqStatus;
    this.eUniService
      .uniRequestDegreeCertUpdate(payload)
      .subscribe(() => {
        this.onConfirmed();
      });
  }

  save() {
    const detail: any = _.pick(this.form.value, [
      'verifyStep1',
      'verifyStep2',
      'verifyStep3',
      'verifyStep4',
    ]);

    console.log(detail)
    if (!detail.verifyStep1 || !detail.verifyStep2 || !detail.verifyStep3 || !detail.verifyStep4) {
      this.dialog.open(CompleteDialogComponent, {
        width: '350px',
        data: {
          header: `กรุณาเลือกผลการตรวจสอบให้ครบถ้วน `,
          btnLabel: 'ตกลง',
          isDanger: true
        },
      });
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลผลการตรวจสอบ
        ใช่หรือไม่`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onSubmitKSP();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        subContent: `ระบบส่งแบบคำขอเพื่อพิจารณาประเมินหลักสูตร
        เรียบร้อย`,

        showPrintButton: true,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.location.back();
      }
    });
  }
  get disableFields(): { forward: any[]; verify: any[] } {
    if (this.form.controls.step5.value.verify == 1) {
      return { forward: [2], verify: [] };
    }
    if (this.form.controls.step5.value.verify == 2) {
      return { forward: [1, 3, 4], verify: [] };
    }
    return { forward: [], verify: [] };
  }
  goBack() {
    this.stepper?.previous();
  }

  goForward() {
    this.stepper?.next();
  }
}
