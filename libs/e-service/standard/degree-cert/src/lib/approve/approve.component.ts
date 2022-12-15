import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
  FilesPreviewComponent,
  PdfViewerComponent,
} from '@ksp/shared/dialog';
import { Location } from '@angular/common';
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
import moment from 'moment';
const detailToState = (res: any) => {
  const dataReturn = _.filter(res?.datareturn, ({ process }: any) =>
    ['3', '4', '5'].includes(process)
  ).map((data: any) => {
    return parseJson(data?.detail);
  });
  const verifyItems = _.filter(dataReturn, ({ verify }) => verify);
  const verify = verifyItems?.map((data: any) => {
    const verifyObject: any = {};
    verifyObject.isBasicValid = _.get(data, 'verify.result') === '1';
    return verifyObject;
  });
  const considerCourses = _.reduce(
    dataReturn,
    (prev: any, curr) => {
      if (curr?.considerCourses) {
        prev.considerCourses = _.concat(
          prev.considerCourses,
          curr?.considerCourses
        );
      }

      if (curr?.considerCert) {
        prev.considerCert = _.concat(prev.considerCert, curr?.considerCert);
      }
      return prev;
    },
    { considerCourses: [], considerCert: [] }
  );
  return {
    verify,
    ...considerCourses,
  };
};
@Component({
  selector: 'e-service-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  form = this.fb.group({
    approveYear: [],
    reasonTimes: [],
    date: [],
    boardType: [],
    boardName: [],
    chairmanName: [],
    step1: '',
    verify: [],
    approveData: [],
  });
  allowEdit = false;
  step1Data: any;
  daftRequest: any;
  formData: any;

  verifyResult: any;
  requestNumber = '';
  choices = [
    { name: 'รับรอง', value: 1 },
    { name: 'ไม่รับรอง', value: 2 },
    { name: 'ให้สถาบันแก้ไข / เพิ่มเติม', value: 3 },
    { name: 'ส่งคืนหลักสูตร', value: 4 },
    { name: 'ยกเลิกการรับรอง', value: 5 },
  ];
  considerCourses: any = [];
  considerCert: any = [];
  newConsiderCourses: any = [];
  newConsiderCert: any = [];
  result: any = { '1': 'ผ่านการพิจารณา', '2': 'ไม่ผ่านการพิจารณา' };
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
    this.getDegreeCert();
    this.getHistory();
    this.newConsiderCert = _.get(this.location.getState(), 'considerCert', []);
    this.newConsiderCourses = _.get(
      this.location.getState(),
      'considerCourses',
      []
    );
  }
  getDegreeCert() {
    if (this.route.snapshot.params['key']) {
      this.eUniService
        .uniRequestDegreeCertSelectById(this.route.snapshot.params['key'])
        .pipe(
          map((res) => {
            this.daftRequest = res;
            this.allowEdit = res?.requestprocess === '4';
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          if (res?.returncode !== 98) {
            this.requestNumber = res?.requestNo;
            this.step1Data = res.step1;
            this.formData = res;
            this.form.patchValue({
              step1: res.step1,
            });
          }
        });
    }
  }

  getHistory() {
    this.eRequestService
      .kspUniRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        this.verifyResult = res?.verify;
        this.considerCert = [
          ...this.newConsiderCert,
          ...(res?.considerCert || []),
        ];
        this.considerCourses = [
          ...this.newConsiderCourses,
          ...(res?.considerCourses || []),
        ];
      });
  }

  cancel() {
    this.location.back();
  }

  prevPage() {
    this.router.navigate(['/degree-cert', 'list', 1, 2]);
  }

  save() {
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
        this.onSubmitDeGreeCert();
      }
    });
  }

  onSubmitKSP(degreeApproveCode: any, uniDegreeCertId: any) {
    if (!degreeApproveCode || !uniDegreeCertId)
      return this.onConfirmed('บันทึกข้อมูลไม่สำเร็จ');
    const detail: any = _.pick(this.form.value, ['verify', 'approveData']);
    const payload: any = {
      systemtype: '3',
      requestid: this.daftRequest?.requestid,
      userid: getCookie('userId'),
      process: '5',
    };
    payload.status = _.get(this.form, 'value.verify.result', '');
    payload.detail = jsonStringify({
      ...detail,
      considerCourses: this.newConsiderCourses,
      considerCert: this.newConsiderCert,
      degreeApproveCode: degreeApproveCode,
      uniDegreeCertId: uniDegreeCertId,
    });
    this.eRequestService
      .kspUpdateRequestUniRequestDegree(payload)
      .subscribe(() => {
        this.onConfirmed();
      });
  }
  toVerifyPage(type: number) {
    const state: any = {};
    state['considerCourses'] = this.newConsiderCourses;
    state['considerCert'] = this.newConsiderCert;
    this.router.navigate(
      ['/degree-cert', 'verify', type, 4, this.route.snapshot.params['key']],
      {
        state,
      }
    );
  }
  toDate(date: any) {
    return thaiDate(moment(date).toDate());
  }
  get isApprove() {
    return _.get(this.form.controls.verify.value, 'result') == 1;
  }

  view(e: any) {
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      width: '1200px',
      height: '100vh',
      data: {
        title: e?.file?.filename,
        files: [e?.file],
        checkresult: [],
        systemType: 'uni',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('');
    });
  }
  toDetail() {
    this.router.navigate([
      '/degree-cert',
      'check',
      this.route.snapshot.params['key'],
    ]);
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
    if (['a', 'b', 'c'].includes(this.daftRequest?.degreelevel)) {
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
        ? JSON.stringify(step2?.plan2?.subjects)
        : null;
    }
    return reqBody;
  }
  onSubmitDeGreeCert() {
    this.eUniService
      .uniDegreeCertInsert(this._getRequest())
      .subscribe((res) => {
        this.onSubmitKSP(res?.degreeapprovecode, res?.id);
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
        this.router.navigate(['/degree-cert', 'list', 1, 2]);
      }
    });
  }
}
