import { jsonStringify, parseJson, getCookie } from '@ksp/shared/utility';
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
    ['2', '3'].includes(process)
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
        this.verifyResult = res.newres;
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

  private _getRequest(): any {
    const payload: any = _.pick(this.daftRequest, [
      'requestid',
      'requestno',
      'degreeapprovecode',
      'uniid',
      'unitype',
      'uniname',
      'unicode',
      'uniprovince',
      'degreelevel',
      'courseacademicyear',
      'coursename',
      'coursetype',
      'coursestatus',
      'coursemajor',
      'coursefieldofstudy',
      'coursesubjects',
      'fulldegreenameth',
      'fulldegreenameen',
      'shortdegreenameth',
      'shortdegreenameen',
      'courseapprovetime',
      'courseapprovedate',
      'courseacceptdate',
      'coursedetailtype',
      'coursedetailinfo',
      'teachinglocation',
      'responsibleunit',
      'evaluatelocation',
      'coordinatorinfo',
      'coursestructure',
      'courseplan',
      'courseteacher',
      'courseinstructor',
      'courseadvisor',
      'processtrainning',
      'processteaching',
      'attachfiles',
      'requestdate',
      'tokenkey',
    ]);
    if (payload?.coursedetailinfo)
      payload.coursedetailinfo = jsonStringify(
        parseJson(payload.coursedetailinfo)
      );
    if (payload?.teachinglocation)
      payload.teachinglocation = jsonStringify(
        parseJson(payload.teachinglocation)
      );
    if (payload?.responsibleunit)
      payload.responsibleunit = jsonStringify(
        parseJson(payload.responsibleunit)
      );
    if (payload?.evaluatelocation)
      payload.evaluatelocation = jsonStringify(
        parseJson(payload.evaluatelocation)
      );
    if (payload?.coordinatorinfo)
      payload.coordinatorinfo = jsonStringify(
        parseJson(payload.coordinatorinfo)
      );
    if (payload?.courseteacher)
      payload.courseteacher = jsonStringify(parseJson(payload.courseteacher));
    if (payload?.courseinstructor)
      payload.courseinstructor = jsonStringify(
        parseJson(payload.courseinstructor)
      );
    if (payload?.courseadvisor)
      payload.courseadvisor = jsonStringify(parseJson(payload.courseadvisor));
    if (payload?.processtrainning)
      payload.processtrainning = jsonStringify(
        parseJson(payload.processtrainning)
      );
    if (payload?.processteaching)
      payload.processteaching = jsonStringify(
        parseJson(payload.processteaching)
      );
    if (payload?.coursestructure)
      payload.coursestructure = jsonStringify(
        parseJson(payload.coursestructure)
      );
    if (payload?.courseplan)
      payload.courseplan = jsonStringify(parseJson(payload.courseplan));
    return payload;
  }
  cancel() {
    this.router.navigate(['/', 'degree-cert', 'list', 0]);
  }
  onSubmitKSP() {
    const verify = _.get(this.form, 'value.step5.verify', '');
    let process;
    let status;
    if (verify == 1) {
      process = _.toNumber(this.daftRequest?.requestprocess) + 2;
      status = 1;
    } else if (verify == 2) {
      process = _.toNumber(this.daftRequest?.requestprocess) + 2;
      status = 2;
    }

    try {
      const detail: any = _.pick(this.form.value, [
        'verifyStep1',
        'verifyStep2',
        'verifyStep3',
        'verifyStep4',
      ]);
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
      payload.detail = jsonStringify(detail);
      this.eRequestService
        .kspUpdateRequestUniRequestDegree(payload)
        .subscribe(() => {
          this.onConfirmed();
        });
    } catch (error) {
      console.log(error);
    }
  }
  save() {
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
