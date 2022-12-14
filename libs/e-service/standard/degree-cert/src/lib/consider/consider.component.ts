import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent, PdfViewerComponent } from '@ksp/shared/dialog';
import {
  ERequestService,
  EUniService,
  UniInfoService,
} from '@ksp/shared/service';
import {
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

const detailToState = (res: any) => {
  const newRes = res?.datareturn
    .filter(({ process }: any) => ['3', '4'].includes(process))
    .map((data: any) => {
      return parseJson(data?.detail);
    });
  const verifyItems = _.filter(newRes, ({ verify }) => verify);
  const verifyResult = verifyItems.map((data) => ({
    isBasicValid: _.get(data, 'verify.result') === '1',
  }));
  const considerCourses = _.reduce(
    newRes,
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
    ...considerCourses,
    verifyResult: verifyResult,
  };
};
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
  verifyResult: {
    isBasicValid: boolean;
    isCourseValid: boolean;
    isAttachmentValid: boolean;
    isProcessValid: boolean;
  }[] = [];
  daftRequest: any;
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
        // this.form.patchValue({
        //   plan: lastData?.plan || {},
        //   considerationResult: lastData?.considerationResult || {},
        // });
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
            const plan: any[] = [];
            if (res.step2.plan1.plans && res.step2.plan1.plans.length > 0) {
              res.step2.plan1.plans.map((data: any) => {
                plan.push({ ...data, ...{ consider: false } });
              });
            }
            const plans = { ...res.step2.plan1, ...{ plansResult: plan } };
            this.requestNumber = res?.requestNo;
            this.form.patchValue({
              step1: res.step1,
              plan: plans,
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
            this.router.navigate(['/', 'degree-cert', 'list', 3, 1]);
          });
      }
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
        systemType: 'uni',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('');
    });
  }
}
