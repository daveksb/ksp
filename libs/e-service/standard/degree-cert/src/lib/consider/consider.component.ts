import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
  PdfViewerComponent,
} from '@ksp/shared/dialog';
import {
  ERequestService,
  EUniService,
  UniInfoService,
} from '@ksp/shared/service';
import {
  formatDate,
  getCookie,
  jsonStringify,
  parseJson,
  thaiDate,
} from '@ksp/shared/utility';
import _ from 'lodash';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import moment from 'moment';
import { FileGroup } from '@ksp/shared/interface';
import { EUniApproveProcess } from '@ksp/shared/constant';

const detailToState = (res: any) => {
  const newRes = res?.datareturn
    .filter(({ process, detail }: any) => ['4', '5'].includes(process) && detail)
    .map((data: any) => {
      return { ...data, detail: parseJson(data?.detail)};
    });
  const verifyItems = _.filter(newRes, ({ detail }) => detail && detail.verify);
  const verifyResult = verifyItems.map((data) => ({
    isBasicValid: _.get(data.detail, 'verify.result') === '1',
    name: mapProcess(data),
    ...data
  }));
  const considerCourses = _.reduce(
    newRes,
    (prev: any, curr) => {
      if (curr?.detail.considerCourses) {
        prev.considerCourses = _.concat(
          prev.considerCourses,
          curr?.detail.considerCourses
        );
      }

      if (curr?.detail.considerCert) {
        prev.considerCert = _.concat(prev.considerCert, curr?.detail.considerCert);
      }
      return prev;
    },
    { considerCourses: [], considerCert: [] }
  );
  return {
    ...considerCourses,
    verifyResult: verifyResult,
  };
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
  selector: 'e-service-consider',
  templateUrl: './consider.component.html',
  styleUrls: ['./consider.component.scss'],
})
export class ConsiderComponent implements OnInit {
  allowEdit = false;
  form = this.fb.group({
    step1: [],
    step2: [
      {
        plans: [],
      },
    ],
    step3: [],
    step4: [],
    step5: [],
    plan: [
      {
        plans: [],
        plansResult: [],
        subjects: [],
      },
    ],
    verify: [
      {
        detail: null,
        reason: null,
        result: null,
      },
    ],
  });
  verifyResult: any[] = [];
  daftRequest: any;
  stepData: any;
  requestNumber = '';
  requestdate = '';
  considerCourses: any = [];
  considerCert: any = [];
  newConsiderCourses: any = [];
  newConsiderCert: any = [];
  choices = [
    { name: 'เห็นควรพิจารณาให้การรับรอง', value: 1 },
    { name: 'เห็นควรพิจารณาไม่ให้การรับรอง', value: 2 },
    { name: 'ให้สถาบันแก้ไข / เพิ่มเติม', value: 3 },
    { name: 'ส่งคืนหลักสูตร', value: 4 },
  ];
  result: any = { '1': 'ผ่านการพิจารณา', '2': 'ไม่ผ่านการพิจารณา' };

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private eUniService: EUniService,
    private uniInfoService: UniInfoService,
    private fb: FormBuilder,
    private eRequestService: ERequestService,
    private location: Location
  ) {}

  getHistory() {
    this.newConsiderCert = _.get(this.location.getState(), 'considerCert', []);
    this.newConsiderCourses = _.get(
      this.location.getState(),
      'considerCourses',
      []
    );
    this.eRequestService
      .kspUniRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res: any) => {
        this.verifyResult = res?.verifyResult;
        this.considerCourses = [
          ...(res?.considerCourses || []),
          ...this.newConsiderCourses,
        ];
        this.considerCert = [
          ...(res?.considerCert || []),
          ...this.newConsiderCert,
        ];
        const lastPlan = _.last(res?.verifyResult) as any;
        this.form.controls.plan.patchValue({
          plans: lastPlan?.detail?.plan.plans,
          plansResult: lastPlan?.detail?.plan.plansResult,
          subjects: lastPlan?.detail?.plan.subjects
        });
        this.form.controls.verify.patchValue(lastPlan?.detail?.verify);
      });
  }

  getDegreeCert() {
    if (this.route.snapshot.params['key']) {
      this.eUniService
        .uniRequestDegreeCertSelectById(this.route.snapshot.params['key'])
        .pipe(
          map((res) => {
            this.daftRequest = res;
            this.allowEdit =
              res?.requestprocess === '3' && res?.requeststatus === '1';
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          if (res?.returncode !== 98) {
            this.stepData = res;
            this.requestNumber = res?.requestNo;
            this.form.patchValue({
              step1: res.step1,
              plan: res?.step2?.plan1 || res?.step2?.plan2,
            });
          }
        });
    }
  }

  ngOnInit(): void {
    this.getDegreeCert();
    this.getHistory();
  }

  cancel() {
    this.router.navigate(['/degree-cert', 'list', 3, 1]);
  }

  prevPage() {
    this.router.navigate(['/degree-cert', 'list', 3, 1]);
  }

  save() {
    const detail = jsonStringify({
      ...this.form.value,
      considerCourses: this.newConsiderCourses,
      considerCert: this.newConsiderCert,
    });
    const payload: any = {
      systemtype: '3',
      process: '4',
      requestid: this.daftRequest?.requestid,
      status: _.get(this.form, 'value.verify.result', ''),
      detail,
      userid: getCookie('userId'),
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลผลการพิจารณาหลักสูตร
        ใช่หรือไม่`,
      },
    });
    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.eRequestService
          .kspUpdateRequestUniRequestDegree(payload)
          .subscribe(() => {
            this.updatePlan();
            // this.onConfirmed();
          });
      }
    });
  }

  updatePlan() {
    const process = '4';
    const status = _.get(this.form, 'value.verify.result', '')
    const payload = this._getRequest('4', status);
    payload.process = process;
    payload.status = status;
    payload.requestprocess = process;
    payload.requeststatus = status;
    this.eUniService
      .uniRequestDegreeCertUpdate(payload)
      .subscribe(() => {
        this.onConfirmed();
      });
  }

  toVerifyPage(type: number) {
    const state: any = {};
    state['considerCourses'] = this.newConsiderCourses;
    state['considerCert'] = this.newConsiderCert;
    this.router.navigate(
      ['/degree-cert', 'verify', type, 3, this.route.snapshot.params['key']],
      {
        state,
      }
    );
  }

  toDate(date: any) {
    return thaiDate(moment(date).toDate());
  }
  toDetail() {
    this.router.navigate([
      '/degree-cert',
      'check',
      this.route.snapshot.params['key'],
    ]);
  }

  view(e: any) {
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      width: '1200px',
      height: '100vh',
      data: {
        title: e?.file?.filename,
        files: [e?.file],
        checkresult: [],
        systemType: 'ksp',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('');
    });
  }

  onConfirmed(header = 'บันทึกข้อมูลสำเร็จ') {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list', 3, 1]);
      }
    });
  }

  private _getRequest(process: string, status: string): any {
    const step1: any = this.stepData.step1;
    const step2: any = this.stepData.step2;
    const step3: any = this.stepData.step3;
    const step4: any = this.stepData.step4;

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
    };
    const newPlans = this.form.controls.plan.getRawValue();
    if (['1', '2', '3', '4'].includes(this.daftRequest.degreelevel)) {
      reqBody['coursestructure'] = JSON.stringify(newPlans?.plansResult);
      reqBody['courseplan'] = JSON.stringify(newPlans?.subjects);
    } else {
      reqBody['coursestructure'] = JSON.stringify(newPlans?.plansResult);
      reqBody['courseplan'] = JSON.stringify(newPlans?.subjects);
    }
    reqBody['id'] = this.daftRequest.id;
    return reqBody;
  }
}
