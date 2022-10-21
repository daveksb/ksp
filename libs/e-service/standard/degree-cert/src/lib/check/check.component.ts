import { jsonStringify, parseJson, getCookie } from '@ksp/shared/utility';
import { Component, OnInit } from '@angular/core';
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
import { map, switchMap, lastValueFrom } from 'rxjs';
import _ from 'lodash';
const detailToState = (res: any) => {
  let newRes = res?.datareturn.map((data: any) => {
    return parseJson(data?.detail);
  });
  newRes = newRes?.map((data: any) => {
    const verifyObject: any = {};
    verifyObject.isBasicValid = _.get(data, 'verifyStep1.result') ==="1"
    verifyObject.isCourseValid =  _.get(data, 'verifyStep2.result')==="1"
    verifyObject.isAttachmentValid = _.get(data, 'verifyStep3.result')==="1"
    verifyObject.isProcessValid =  _.get(data, 'verifyStep4.result')==="1"
    return verifyObject;
  });
  return newRes || [];
};
@Component({
  selector: 'e-service-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent implements OnInit {
  form = this.fb.group<any>({
    step1: [],
    step2: [
      {
        plans: [],
      },
    ],
    step3: [],
    step4: [],
    step5: [],
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
  }[] = [];
  requestNumber = '';
  degreeType = '';
  choices = [
    {
      name: 'เครบถ้วน และถูกต้อง',
      value: 1,
    },
    {
      name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
      value: 2,
    },
  ];
  daftRequest: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private eUniService: EUniService,
    private eRequestService: ERequestService
  ) {}
  getHistory() {
    this.eRequestService
      .kspRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        this.verifyResult = res;
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
          }
        });
    }
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
    payload.status = _.get(this.form, 'value.step5.verify', '');
    payload.process = _.get(this.form, 'value.step5.forward', '');
    payload.detail = jsonStringify(detail);
    this.eRequestService.KspApproveRequest(payload).subscribe(() => {
      // this.onSubmitDeGreeCert();
    });
  }
  onSubmitDeGreeCert() {
    this.eUniService.uniDegreeCertInsert(this._getRequest()).subscribe(() => {
      this.onConfirmed();
    });
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
