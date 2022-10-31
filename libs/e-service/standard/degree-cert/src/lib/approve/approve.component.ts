import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Location } from '@angular/common'
import {
  ERequestService,
  EUniService,
  UniInfoService,
} from '@ksp/shared/service';
import { getCookie, jsonStringify, parseJson } from '@ksp/shared/utility';
import _ from 'lodash';
import { map } from 'rxjs';
const detailToState = (res: any) => {
  let newRes = _.filter(res?.datareturn, { process: '6' }).map((data: any) => {
    return parseJson(data?.detail);
  });
  newRes = newRes?.map((data: any) => {
    const verifyObject: any = {};
    verifyObject.isBasicValid = _.get(data, 'verify.result') === '1';
    return verifyObject;
  });
  return newRes || [];
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
    approveData:[]
  });
  daftRequest:any;
  verifyResult: any;
  requestNumber = '';
  choices = [
    { name: 'รับรอง', value: 1 },
    { name: 'ไม่รับรอง', value: 2 },
    { name: 'ให้สถาบันแก้ไข / เพิ่มเติม', value: 3 },
    { name: 'ส่งคืนหลักสูตร', value: 4 },
    { name: 'ยกเลิกการรับรอง', value: 5 },
  ];

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
      .kspRequestProcessSelectByRequestId(this.route.snapshot.params['key'])
      .pipe(map(detailToState))
      .subscribe((res) => {
        this.verifyResult = res;
        console.log(this.verifyResult);
      });
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '2']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'verify', '2']);
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
        this.onSubmitKSP()
      }
    });
  }

  onSubmitKSP() {
    const detail: any = _.pick(this.form.value, ['verify',"approveData"]);
    const payload: any = {
      systemtype: '3',
      requestid: this.daftRequest?.requestid,
      userid: getCookie('userId'),
      process: '6',
    };
    payload.status = _.get(this.form, 'value.verify', '');
    payload.detail = jsonStringify(detail);
    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
    this.location.back();
    });
  }
}
