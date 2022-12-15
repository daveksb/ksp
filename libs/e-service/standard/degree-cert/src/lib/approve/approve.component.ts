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
    const payload: any = {
      uniname: this.step1Data?.institutionsName || null,
      unitype: this.step1Data?.institutionsGroup || null,
      uniprovince: this.step1Data?.provience || null,
      unicode: this.step1Data?.institutionsCode || null,
      degreelevel: this.step1Data?.degreeTypeForm?.degreeType || null,
      courseacademicyear: this.step1Data?.degreeTypeForm?.courseYear || null,
      coursename: this.step1Data?.degreeTypeForm?.courseName || null,
      coursetype: this.step1Data?.degreeTypeForm?.courseType || null,
      coursestatus: this.step1Data?.degreeTypeForm?.courseStatus || null,
      fulldegreenameth:
        this.step1Data?.degreeTypeForm?.degreeNameThFull || null,
      shortdegreenameth:
        this.step1Data?.degreeTypeForm?.degreeNameThShort || null,
      fulldegreenameen:
        this.step1Data?.degreeTypeForm?.degreeNameEnFull || null,
      shortdegreenameen:
        this.step1Data?.degreeTypeForm?.degreeNameEnShort || null,
      courseapprovetime:
        this.step1Data?.degreeTypeForm?.courseApproveTime || null,
      courseapprovedate: this.step1Data?.degreeTypeForm?.courseApproveDate
        ? formatDate(
            new Date(
              this.step1Data?.degreeTypeForm?.courseApproveDate
            ).toISOString()
          )
        : null,
      courseacceptdate: this.step1Data?.degreeTypeForm?.courseAcceptDate
        ? formatDate(
            new Date(
              this.step1Data?.degreeTypeForm?.courseAcceptDate
            ).toISOString()
          )
        : null,
      coursedetailtype: this.step1Data?.courseDetailType || null,
      coursedetailinfo: this.step1Data?.courseDetail
        ? JSON.stringify(this.step1Data?.courseDetail)
        : null,
      teachinglocation: this.step1Data?.locations
        ? JSON.stringify(this.step1Data?.locations)
        : null,
      responsibleunit: this.step1Data?.institutions
        ? JSON.stringify(this.step1Data?.institutions)
        : null,
      evaluatelocation: this.step1Data?.locations2
        ? JSON.stringify(this.step1Data?.locations2)
        : null,
      coordinatorinfo: this.step1Data?.coordinator
        ? JSON.stringify(this.step1Data?.coordinator)
        : null,
      requestid: this.daftRequest?.requestid,
      uniid: this.daftRequest?.uniid,
    };
    return payload;
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
