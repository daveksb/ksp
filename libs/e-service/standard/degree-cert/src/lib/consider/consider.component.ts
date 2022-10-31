import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent, ConfirmDialogComponent, FilesPreviewComponent } from '@ksp/shared/dialog';
import { ERequestService, EUniService, UniInfoService } from '@ksp/shared/service';
import { jsonStringify, parseJson, thaiDate } from '@ksp/shared/utility';
import _ from 'lodash';
import { map } from 'rxjs';
import { DegreeCertInfo } from '../list/e-service-degree-cert-list.component';

const detailToState = (res: any) => {
  let newRes = res?.datareturn.map((data: any) => {
    return parseJson(data?.detail);
  });
  let considerCourses: any = [], considerCert: any = [];
  let plan: any = {}, considerationResult: any = {};
  newRes = newRes?.map((data: any) => {
    const mappingData: any = {};
    mappingData.isBasicValid = _.get(data, 'verifyStep1.result') ==="1"
    mappingData.isCourseValid =  _.get(data, 'verifyStep2.result')==="1"
    mappingData.isAttachmentValid = _.get(data, 'verifyStep3.result')==="1"
    mappingData.isProcessValid =  _.get(data, 'verifyStep4.result')==="1"
    if (data) {
      if ('plan' in data) {
        plan =  _.get(data, 'plan')
      }
      if ('considerationResult' in data) {
        considerationResult =  _.get(data, 'considerationResult')
      }
      if ('considerCourses' in data) {
        considerCourses.push({ 
          ..._.get(data, 'considerCourses.verifyForm'),
          ...{
            status: _.get(data, 'considerCourses.considerationResult.result'), 
            date: _.get(data, 'considerCourses.verifyForm.date')
                  ? thaiDate(new Date(_.get(data, 'considerCourses.verifyForm.date')))
                  : '',
          }
        });
      }
      if ('considerCert' in data) {
        considerCert.push({ 
          ..._.get(data, 'considerCert.verifyForm'),
          ...{
            status: _.get(data, 'considerCert.considerationResult.result'),
            date: _.get(data, 'considerCert.verifyForm.date')
                  ? thaiDate(new Date(_.get(data, 'considerCert.verifyForm.date')))
                  : '',
          }
        });
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
  dataSource = new MatTableDataSource<DegreeCertInfo>();
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
  requestNumber = '';
  requestdate = '';
  considerCourses: any = [];
  considerCert: any = [];
  daftRequest: any;

  choices = [
    { name: 'เห็นควรพิจารณาให้การรับรอง', value: 1 },
    { name: 'เห็นควรพิจารณาไม่ให้การรับรอง', value: 2 },
    { name: 'ให้สถาบันแก้ไข / เพิ่มเติม', value: 3 },
    { name: 'ส่งคืนหลักสูตร', value: 4 },
  ];

  mappingStatus = [
    [
      { name: '', value: 0 },
      { name: 'ผ่านการพิจารณา', value: 1 },
      { name: 'ไม่ผ่านการพิจารณา', value: 2 },
    ],
    [
      { name: '', value: 0 },
      { name: "รับรอง", value: 1 },
      { name: "ไม่รับรอง", value: 2 },
      { name: "ให้สถาบันแก้ไข / เพิ่มเติม", value: 3 },
      { name: "ส่งคืน", value: 4 },
      { name: "ยกเลิกการรับรอง", value: 5 },
    ]
  ];

  constructor(
    public dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    private eUniService: EUniService,
    private uniInfoService: UniInfoService,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}

  getHistory() {
    this.eRequestService
      .kspRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        const lastData = res[res.length - 1];
        this.verifyResult = res;
        this.considerCourses = lastData?.considerCourses || [];
        this.considerCert = lastData?.considerCert || [];
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
            this.dataSource.data = [{
              key: res?.id,
              requestno: res?.requestno,
              date: res?.requestdate
                ? thaiDate(new Date(res?.requestdate))
                : '',
              uni: res?.uniname,
              major: res?.fulldegreenameth,
              verifyStatus: 'รับข้อมูล',
              considerStatus: 'พิจารณา',
              approveStatus: 'พิจารณา',
              approveDate: '',
              editDate: res?.updatedate
                ? thaiDate(new Date(res?.requestdate))
                : '',
              verify: 'แก้ไข',
              consider: 'แก้ไข',
            }];
            this.requestNumber = res?.requestno;
            this.requestdate = res?.requestdate
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
            this.form.patchValue({
              step1: res.step1,
              step2: res.step2,
              step3: res.step3,
              step4: res.step4,
              plan: plans,
            });
          }
          this.getHistory();
        })
    }
  }

  ngOnInit(): void {
    this.getDegreeCert();
    // this.getHistory();
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '1']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'verify', '1']);
  }

  onSubmitDeGreeCert() {
    this.eUniService.uniDegreeCertInsert(this._getRequest()).subscribe(() => {
      this.onConfirmed();
    });
  }

  save() {
    const payload: any = {
      systemtype: '3',
      process: '5',
      requestid: this.route.snapshot.params['key'],
      status: this.form.value.considerationResult?.result,
      detail: jsonStringify(this.form.value),
      userid: null // getCookie('userId'),
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
          this.onSubmitDeGreeCert();
          // this.router.navigate(['/', 'degree-cert', 'list', '1']);
        });
      }
    });
  }

  toVerifyPage(type: number) {
    this.router.navigate(['./', 'degree-cert', 'verify', type], {
      state:{
        dataSource: this.dataSource.data
      }
    });
  }

  view() {
    const dialogRef = this.dialog.open(FilesPreviewComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
      }
    });
  }

  private _getRequest(): any {
    let final: any = {};
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
    
    Object.keys(payload).map((key: string) => {
      final[key] = payload[key] === "" ? null : payload[key]; 
    })
    return final;
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        subContent: `ระบบส่งใบคำขอเพื่อพิจารณาประเมินหลักสูตร
        เรียบร้อย`,
        buttonLabel: 'กลับสู่หน้าหลัก',
        showPrintButton: true,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list', 0]);
      }
    });
  }
}
