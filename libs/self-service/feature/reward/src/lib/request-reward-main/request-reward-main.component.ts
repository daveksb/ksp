import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import { ListData, SelfRequest, UserInfoForm } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  GeneralInfoService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { providerFactory, replaceEmptyWithNull } from '@ksp/shared/utility';
import * as _ from 'lodash';

@Component({
  selector: 'ksp-request-reward-main',
  templateUrl: './request-reward-main.component.html',
  styleUrls: ['./request-reward-main.component.scss'],
  providers: providerFactory(RequestRewardMainComponent),
})
export class RequestRewardMainComponent {
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'เลขที่ใบอนุญาต',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];

  rewardTypes: ListData[] = rewardTypes;
  userInfo: any;
  //selectedRewardType!: number;

  form = this.fb.group({
    rewardType: [0],
    rewardDetail: [],
  });

  constructor(
    //private route: ActivatedRoute,
    /*     router: Router,
    dialog: MatDialog,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
     */
    private requestService: SelfRequestService,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      //console.log('my info = ', res);
      this.userInfo = res;
    });
  }

  tempSave() {
    //
  }

  createRequest() {
    //const payload = this.form.value;
    const self = new SelfRequest('1', `${this.form.value.rewardType}`, '1');

    const data: any = this.form.value.rewardDetail;

    console.log('reward detail = ', data.userInfo);

    const temp = { ...self, ...new UserInfoForm() };

    const allowKey = Object.keys(self);

    const payload = _.pick(data.userInfo, allowKey);

    //const { id, requestdate, ...payload } = replaceEmptyWithNull(temp);
    console.log('payload = ', payload);
    /*     this.requestService.createRequest(payload).subscribe((res) => {
      console.log('res = ', res);
    }); */
  }
}

const rewardTypes = [
  {
    value: 40,
    label: `รางวัลคุรุสภา`,
  },
  {
    value: 41,
    label: `รางวัลครูภาษาไทยดีเด่น`,
  },
  {
    value: 42,
    label: `รางวัลครูผู้สอนดีเด่น`,
  },
  {
    value: 43,
    label: `รางวัลคุรุสดุดี`,
  },
  {
    value: 44,
    label: `รางวัลครูอาวุโส`,
  },
  {
    value: 45,
    label: `รางวัลผลงานวิจัยของคุรุสภา`,
  },
];
