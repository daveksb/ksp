import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent, ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Location } from '@angular/common';
import _ from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { ERequestService } from '@ksp/shared/service';
import { jsonStringify, parseJson } from '@ksp/shared/utility';
import { map } from 'rxjs';
const detailToState = (res: any) => {
  const newRes =
    _.filter(res?.datareturn, ({ process, status, userid }) => process === '3' && status === '1' && userid ).map(
      (data: any) => {
        return parseJson(data?.detail);
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
  };
};
@Component({
  selector: 'e-service-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  titles = [
    '',
    'พิจารณาประเมินหลักสูตร',
    'พิจารณารับรองหลักสูตร',
    'พิจารณารับรอง',
    'บันทึกการประเมินสภาพจริง',
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
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      this.requestId = res.get('requestId');
      this.process = res.get('process');
    });
  }

  cancel() {
    if (this.processType > 2) {
      this.location.back();
    } else {
      this.router.navigate(['./degree-cert', 'list', this.processType]);
    }
  }

  next() {
    this.router.navigate(['./degree-cert']);
  }
  saveState() {
    const state: any = {};
    state.considerCourses = _.get(
      this.location.getState(),
      'considerCourses',
      []
    );
    state.considerCert = _.get(this.location.getState(), 'considerCert', []);
    if (this.processType === 3)
      state.considerCert = [...state.considerCert, this.form.value];
    if (this.processType === 4)
      state.considerCourses = [...state.considerCourses, this.form.value];

    if (this.process === '3') {
      this.router.navigate(['./degree-cert', 'consider', this.requestId], {
        state,
      });
    } else if (this.process === '4') {
      this.router.navigate(['./degree-cert', 'approve', this.requestId], {
        state,
      });
    }
  }
  save() {
    if (this.requestId) return this.saveState();
    const detail: any = {};
    if (this.processType === 2) {
      detail['considerCourses'] = this.form.value;
    }
    if (this.processType === 1) {
      detail['considerCert'] = this.form.value;
    }
    const payload: any = {
      systemtype: '3',
      process: this.process,
      status: this.form.value.considerationResult?.result,
      detail: jsonStringify(detail),
      userid: null, // getCookie('userId'),
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
          if (data?.status === '1' && data?.process === '3') {
            if (this.processType === 1) {
              payload.process = '4';
            } else if (this.processType == 2) {
              payload.process = '5';
            } else {
              payload.process = this.process;
            }
            this.eRequestService
            .kspUpdateRequestUniRequestDegree(payload)
            .subscribe(() => {
              if (index === _.size(this.dataSource) - 1)
                this.onConfirmed(index, 'บันทึกข้อมูลสำเร็จ');
            });
            // this.eRequestService
            //   .kspUniRequestProcessSelectByRequestId(payload.requestid)
            //   .pipe(map(detailToState))
            //   .subscribe((res) => {
            //     console.log(res)
            //     if (
            //       (this.processType === 2 && res?.isNotEmptyConsiderCert) ||
            //       (this.processType === 1 && res?.isNotEmptyConsiderCourses)
            //     ) {
            //       payload.process = '4';
            //     }
            //     this.eRequestService
            //       .kspUpdateRequestUniRequestDegree(payload)
            //       .subscribe(() => {
            //         if (index === _.size(this.dataSource) - 1)
            //           this.location.back();
            //       });
            //   });
          }
        });
      }
    });
  }

  onConfirmed(index: any, header: any) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.location.back();
      }
    });
  }
}
