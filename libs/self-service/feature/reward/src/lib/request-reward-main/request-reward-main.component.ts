import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-request-reward-main',
  templateUrl: './request-reward-main.component.html',
  styleUrls: ['./request-reward-main.component.scss'],
  providers: providerFactory(RequestRewardMainComponent),
})
export class RequestRewardMainComponent implements OnInit {
  //pageType = 0;
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
  //selectedRewardType!: number;

  form = this.fb.group({
    rewardType: [0],
    rewardDetail: [],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    /* this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    }); */
  }

  tempSave() {
    //
  }

  createRequest() {
    //
  }
}

const rewardTypes = [
  {
    value: 1,
    label: `รางวัลคุรุสภา`,
  },
  {
    value: 2,
    label: `รางวัลครูภาษาไทยดีเด่น`,
  },
  {
    value: 3,
    label: `รางวัลครูผู้สอนดีเด่น`,
  },
  {
    value: 4,
    label: `รางวัลคุรุสดุดี`,
  },
  {
    value: 5,
    label: `รางวัลครูอาวุโส`,
  },
  {
    value: 6,
    label: `รางวัลผลงานวิจัยของคุรุสภา`,
  },
];
