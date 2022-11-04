import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import {
  ERequestService,
  EUniService,
  UniInfoService,
} from '@ksp/shared/service';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { jsonStringify, parseJson } from '@ksp/shared/utility';
import _ from 'lodash';

@Component({
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss'],
})
export class FinalResultComponent implements OnInit {
  form = this.fb.group({
    finalResult: [],
    step1: [],
  });
  daftRequest: any;
  requestNumber = '';
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
  cancel() {
    this.router.navigate(['/', 'degree-cert', 'list', '0']);
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
        subTitle: `คุณยืนยันรหัสรับรองปริญญา
        และประกาศนียบัตรทางการศึกษา ใช่หรือไม่`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onSubmitDeGreeCert();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'ระบบสร้างรหัส',
        subTitle: `รับรองปริญญา และประกาศนียบัตร
        ทางการศึกษาเรียบร้อย ตรวจสอบข้อมูลได้ที่`,
        schoolCode: `"ทะเบียนปริญญา
        และประกาศนียบัตรทางการศึกษา"`,
      },
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list', '0']);
      }
    });
  }
}
