import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData, SelfMyInfo, SelfRequest } from '@ksp/shared/interface';
import { MyInfoService, SelfRequestService } from '@ksp/shared/service';
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
  myInfo!: SelfMyInfo;

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
      this.myInfo = res;
    });
  }

  tempSave() {
    //
  }

  createRequest() {
    const self = new SelfRequest('1', `${this.form.value.rewardType}`, '1');
    const allowKey = Object.keys(self);
    const form: any = this.form.value.rewardDetail;
    const selectData = _.pick(form.userInfo, allowKey);
    const filledData = { ...self, ...selectData };
    const { id, requestdate, ...payload } = replaceEmptyWithNull(filledData);
    console.log('payload = ', payload);
    this.requestService.createRequest(payload).subscribe((res) => {
      //console.log('res = ', res);
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
