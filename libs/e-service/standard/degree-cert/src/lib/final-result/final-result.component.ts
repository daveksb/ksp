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
import { formatDate, jsonStringify, parseJson } from '@ksp/shared/utility';
import _ from 'lodash';
@Component({
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss'],
})
export class FinalResultComponent implements OnInit {
  form = this.fb.group({
    finalResult: [
      {
        reasonTimes: '',
        date: '',
        approvedegreeCode: Math.floor(Math.random() * 1000000000000),
      },
    ],
    step1: [],
  });
  daftRequest: any;
  requestNumber = '';
  step1Data: any;
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
            this.step1Data = res.step1;
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
    };
    payload.degreeapprovecode =
      this.form.value.finalResult?.approvedegreeCode?.toString() || '';
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
