import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Location } from '@angular/common';
import _ from 'lodash';
import { FormBuilder } from '@angular/forms';
import { ERequestService } from '@ksp/shared/service';
import { getCookie, jsonStringify, parseJson } from '@ksp/shared/utility';
import { map } from 'rxjs';
import { FormMode } from '@ksp/shared/interface';
const detailToState = (res: any) => {
  const newRes =
    _.filter(res?.datareturn, ({ process }) => process === '7').map(
      (data: any) => {
        return { detailParse: parseJson(data?.detail), ...data};
      }
    ) || [];
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
    isNotEmptyConsiderCourses: !!_.size(considerCourses?.considerCourses),
    isNotEmptyConsiderCert: !!_.size(considerCourses?.considerCert),
    newRes
  };
};
@Component({
  selector: 'e-service-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss'],
})
export class FollowUpComponent implements OnInit {
  titles = [
    '',
    'พิจารณาประเมินหลักสูตร',
    'พิจารณารับรองหลักสูตร',
    'พิจารณารับรอง',
    'บันทึกการประเมินสภาพจริง',
    'ติดตามผลเชิงประจักษ์'
  ];

  choices = [
    [],
    [
      { name: 'ผ่านการพิจารณา', value: 1 },
      { name: 'ไม่ผ่านการพิจารณา', value: 2 },
    ],
    [
      { name: 'รับรอง', value: 1 },
      { name: 'ไม่รับรอง', value: 2 },
      { name: 'ให้สถาบันแก้ไข / เพิ่มเติม', value: 3 },
      { name: 'ส่งคืน', value: 4 },
      { name: 'ยกเลิกการรับรอง', value: 5 },
    ],
    [
      { name: 'ผ่านการพิจารณา', value: 1 },
      { name: 'ไม่ผ่านการพิจารณา', value: 2 },
    ],
    [
      { name: 'เป็นไปตามเกณฑ์การรับรอง', value: 1 },
      { name: 'ไม่เป็นไปตามเกณฑ์การรับรอง', value: 2 },
    ],
  ];
  dataSource: any[] = [];
  requestId: any;
  process: any;
  processType!: number;
  mode: FormMode = 'edit';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {}
  form = this.fb.group({
    verifyForm: [{}],
    considerationResult: [
      {
        detail: null,
        reason: null,
        result: null,
      },
    ],
  });
  ngOnInit() {
    this.dataSource = _.get(this.location.getState(), 'dataSource', []);
    console.log(this.dataSource)
    this.route.paramMap.subscribe((res) => {
      this.requestId = res.get('key') ? Number(res.get('key')) : '';
      if (this.requestId) {
        this.getHistory();
      }
      //console.log('process type = ', this.processType);
    });
  }

  getHistory() {
    this.eRequestService
    .kspUniRequestProcessSelectByRequestId(this.requestId)
    .pipe(map(detailToState))
    .subscribe((res) => {
      console.log(res)
      const findHistory = res?.newRes.find((data: any) => { return data.status == '1' });
      if (findHistory) {
        this.mode = 'view';
        this.form.patchValue({
          verifyForm: findHistory.detailParse.followUpResult.verifyForm,
          considerationResult: findHistory.detailParse.followUpResult.considerationResult
        })
      }
    });
  }

  cancel() {
    if (this.processType > 2) {
      this.location.back();
    } else {
      this.router.navigate(['./degree-cert', 'list', '6', '3']);
    }
  }

  next() {
    this.router.navigate(['./degree-cert']);
  }

  save() {
    const detail: any = {};
    detail['followUpResult'] = this.form.value;
    const payload: any = {
      systemtype: '3',
      process: '7',
      status: this.form.value.considerationResult?.result,
      detail: jsonStringify(detail),
      userid: getCookie('userId')
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
        this.dataSource.forEach((data: any, index) => {
          payload.requestid = data?.key;
          if (data?.status === '1' && data?.process === '6') {
            this.eRequestService
            .kspUpdateRequestUniRequestDegree(payload)
            .subscribe(() => {
              if (index === _.size(this.dataSource) - 1)
                this.location.back();
            });
          }
        });
      }
    });
  }
}
