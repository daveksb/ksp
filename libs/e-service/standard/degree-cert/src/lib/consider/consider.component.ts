import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ERequestService, EUniService, UniInfoService } from '@ksp/shared/service';
import { getCookie, jsonStringify, parseJson, thaiDate } from '@ksp/shared/utility';
import _ from 'lodash';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import moment from 'moment';

const detailToState = (res: any) => {
  let newRes = res?.datareturn.filter((v: any) => { return v.process === '3' || v.process === '4' || v.process === '5' }).map((data: any) => {
    return parseJson(data?.detail);
  });
  let considerCourses: any = [], considerCert: any = [];
  let plan: any = {}, considerationResult: any = {};
    newRes = newRes?.map((data: any) => {
    const mappingData: any = {};
    mappingData.isBasicValid = _.get(data, 'considerationResult.result') === '1';

    if (data) {
      if ('plan' in data) {
        plan =  _.get(data, 'plan')
      }
      if ('considerationResult' in data) {
        considerationResult =  _.get(data, 'considerationResult')
      }
      if ('considerCourses' in data) {
        considerCourses.push(_.get(data, 'considerCourses'));
      }
      if ('considerCert' in data) {
        considerCert.push(_.get(data, 'considerCert'));
      }
    }
    return mappingData;
  });

  newRes[newRes.length - 1] = { 
    ...newRes[newRes.length - 1],  
    ...{ 
      considerCourses: considerCourses, 
      considerCert: considerCert,
      plan: plan,
      considerationResult: considerationResult
    }
  }
  
  return newRes || [];
};
@Component({
  selector: 'e-service-consider',
  templateUrl: './consider.component.html',
  styleUrls: ['./consider.component.scss'],
})
export class ConsiderComponent implements OnInit {
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
    plan: [{
      plans: [],
      plansResult: [],
      subjects: []
    }],
    considerationResult:[{
      detail: null,
      reason: null,
      result: null
    }],
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
    this.considerCert = _.get(this.location.getState(), 'considerCert', []);
    this.considerCourses = _.get(
      this.location.getState(),
      'considerCourses',
      []
    );
    this.eRequestService
      .kspRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        const lastData = res[res.length - 1];
        this.verifyResult = res;
        this.considerCourses = [...this.considerCourses, ...lastData?.considerCourses || []]
        this.considerCert = [...this.considerCert, ...lastData?.considerCert || []]
        this.form.patchValue({
          plan: lastData?.plan || {},
          considerationResult: lastData?.considerationResult || {},
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
            let plan: any[] = [];
            if (res.step2.plan1.plans && res.step2.plan1.plans.length > 0) {
              res.step2.plan1.plans.map((data: any) => {
                plan.push({...data, ...{consider: false}})
              });
            }
            const plans = {...res.step2.plan1, ...{ plansResult: plan }};
            this.requestNumber = res?.requestNo;
            this.form.patchValue({
              step1: res.step1,
              plan: plans,
            });
          }
        })
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
    const payload: any = {
      systemtype: '3',
      process: '5',
      requestid: this.daftRequest?.requestid,
      status: _.get(this.form, 'value.considerationResult', ''),
      detail: jsonStringify(this.form.value),
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
        this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
          this.router.navigate(['/', 'degree-cert', 'list', 3, 1]);
        });
      }
    });
  }

  toVerifyPage(type: number) {
    const state: any = {};
    state['considerCourses'] = this.considerCourses;
    state['considerCert'] = this.considerCert;
    this.router.navigate(
      ['/degree-cert', 'verify', type, 5, this.route.snapshot.params['key']],
      {}
    );
  }

  toDate(date: any) {
    return thaiDate(moment(date).toDate());
  }
}
