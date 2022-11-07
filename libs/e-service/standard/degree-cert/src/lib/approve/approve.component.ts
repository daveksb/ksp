import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmDialogComponent,
  FilesPreviewComponent,
} from '@ksp/shared/dialog';
import { Location } from '@angular/common';
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
import moment from 'moment';
const detailToState = (res: any) => {
  const dataReturn = _.filter(res?.datareturn, ({ process }: any) =>
    ['3', '4'].includes(process)
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
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          if (res?.returncode !== 98) {
            this.requestNumber = res?.requestNo;
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
        this.onSubmitKSP();
      }
    });
  }

  onSubmitKSP() {
    const detail: any = _.pick(this.form.value, ['verify', 'approveData']);
    const payload: any = {
      systemtype: '3',
      requestid: this.daftRequest?.requestid,
      userid: getCookie('userId'),
      process: '4',
    };
    payload.status = _.get(this.form, 'value.verify.result', '');
    payload.detail = jsonStringify({
      ...detail,
      considerCourses: this.newConsiderCourses,
      considerCert: this.newConsiderCert,
    });
    this.eRequestService
      .kspUpdateRequestUniRequestDegree(payload)
      .subscribe(() => {
        this.router.navigate(['/degree-cert', 'list', 1, 2]);
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

  view(rowData: any) {
    const dialogRef = this.dialog.open(FilesPreviewComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
      }
    });
  }
  toDetail() {
    this.router.navigate([
      '/degree-cert',
      'check',
      this.route.snapshot.params['key'],
    ]);
  }
}
