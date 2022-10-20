import { jsonStringify, parseJson } from '@ksp/shared/utility';
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
  requestNumber = '';
  degreeType = '';
  choices = [
    {
      name: 'เห็นควรพิจารณาให้การรับรอง',
      value: 1,
    },
    {
      name: 'เห็นควรพิจารณาไม่ให้การรับรอง',
      value: 2,
    },
    {
      name: 'ให้สถาบันแก้ไข / เพิ่มเติม',
      value: 3,
    },
    {
      name: 'ส่งคืนหลักสูตร',
      value: 4,
    },
  ];
  dartRequest: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private eUniService: EUniService,
    private eRequestService: ERequestService
  ) {}
  getDegreeCert() {
    if (this.route.snapshot.params['key']) {
      this.eUniService
        .uniRequestDegreeCertSelectById(this.route.snapshot.params['key'])
        .pipe(
          map((res) => {
            this.dartRequest = res;
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          this.requestNumber = res?.requestNo;
          console.log(res.step1);
          this.form.patchValue({
            step1: res.step1,
            step2: res.step2,
            step3: res.step3,
            step4: res.step4,
          });
        });
    }
  }
  ngOnInit(): void {
    this.getDegreeCert();
  }

  private _getRequest(): any {
    const payload: any = _.pick(this.dartRequest, [
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
    const payload: any = _.pick(this.form.value, [
      'verifyStep1',
      'verifyStep2',
      'verifyStep3',
      'verifyStep4',
    ]);
    console.log(this.form.value);
    // this.eRequestService.KspApproveRequest
  }
  async onSubmitDeGreeCert() {
    await lastValueFrom(
      this.eUniService.uniDegreeCertInsert(this._getRequest())
    );
  }
  save() {
    // this.onSubmitAll();
    this.onSubmitKSP();
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   width: '350px',
    //   data: {
    //     title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
    //     subTitle: `คุณยืนยันข้อมูลผลการตรวจสอบ
    //     ใช่หรือไม่`,
    //   },
    // });

    // dialogRef.componentInstance.confirmed.subscribe((res) => {
    //   if (res) {
    //     this.onConfirmed();
    //   }
    // });
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
