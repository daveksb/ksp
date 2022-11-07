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
import {
  formatDate,
  getCookie,
  jsonStringify,
  parseJson,
} from '@ksp/shared/utility';
import _ from 'lodash';

const detailToState = (res: any) => {
  const dataReturn = _.filter(
    res?.datareturn,
    ({ process }: any) => process === '4'
  ).map((data: any) => {
    return parseJson(data?.detail);
  });
  return _.first(dataReturn);
};
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
        approvedegreeCode: '',
      },
    ],
    step1: [],
  });
  daftRequest: any;
  requestNumber = '';
  step1Data: any = {};
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
    this.getHistory();
  }
  getHistory() {
    this.eRequestService
      .kspUniRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        this.getDegreeCert(res?.uniDegreeCertId);
        // this.verifyResult = res?.verify;
      });
  }

  getDegreeCert(id: any) {
    if (id) {
      this.eUniService
        .getUniDegreeCertById(id)
        .pipe(
          map((res) => {
            this.daftRequest = res;
            return this.uniInfoService.mappingUniverSitySelectByIdWithForm(res);
          })
        )
        .subscribe((res) => {
          if (res?.returncode !== 98) {
            this.requestNumber = res?.requestNo;
            this.step1Data = res?.step1;
            this.form.patchValue({
              step1: res.step1,
              finalResult: {
                reasonTimes: '',
                date: '',
                approvedegreeCode: res?.degreeApproveCode || '',
              },
            });
          }
        });
    }
  }
  cancel() {
    this.router.navigate(['/', 'degree-cert', 'list', '0']);
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
        this.onSubmitKSP()
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
    return payload;
  }

  onSubmitKSP() {
    const detail: any = _.pick(this.form.value, ['verify', 'approveData']);
    const payload: any = {
      systemtype: '3',
      requestid: this.daftRequest?.requestid,
      userid: getCookie('userId'),
      process: '5',
    };
    payload.status = "1"
    payload.detail = jsonStringify({
      ...detail,
      formData: this._getRequest(),
      finalResult:this.form.value.finalResult
    });
    this.eRequestService
      .kspUpdateRequestUniRequestDegree(payload)
      .subscribe(() => {
        this.onConfirmed();
      });
  }
}
