import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import { ListData, SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  GeneralInfoService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';

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
    //this.getListData();
    this.myInfoService.getMyInfo().subscribe((res) => {
      console.log('my info = ', res);
      this.userInfo = res;
    });
    //this.checkButtonsDisableStatus();
  }

  /*   patchUserInfoForm(data: any): void {
    this.form.controls.userInfo.patchValue(data);
  }

  patchAddress1Form(data: any): void {
    this.form.controls.address1.patchValue(data);
  }

  patchAddress2Form(data: any): void {
    this.form.controls.address2.patchValue(data);
  }

  patchWorkPlaceForm(data: any): void {
    this.form.controls.workplace.patchValue(data);
  }

  patchAddress2FormWithAddress1(): void {
    console.log(this.form.controls.address1.value);
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
    console.log(this.form.controls.address2.value);
  } */

  tempSave() {
    //
  }

  createRequest() {
    //const payload = this.form.value;
    const self = new SelfRequest();
    self.ref1 = '1';
    self.ref2 = `${this.form.value.rewardType}`;
    self.ref3 = '1';

    self.systemtype = '1';
    self.requesttype = `${this.form.value.rewardType}`;
    self.subtype = '1';

    const { id, ...payload } = self;

    console.log('payload = ', self);
    this.requestService.createRequest(payload).subscribe((res) => {
      console.log('res = ', res);
    });
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
