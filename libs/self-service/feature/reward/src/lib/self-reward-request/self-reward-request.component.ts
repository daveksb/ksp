import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-self-reward-request',
  templateUrl: './self-reward-request.component.html',
  styleUrls: ['./self-reward-request.component.scss'],
  providers: providerFactory(SelfRewardRequestComponent),
})
export class SelfRewardRequestComponent implements OnInit {
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

  rewardTypes: ListData[] = [];
  //selectedRewardType!: number;

  form = this.fb.group({
    rewardType: [0],
    rewardDetail: [],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.rewardTypes = rewardTypes;

    /* this.form.controls['rewardType'].valueChanges.subscribe((res) => {
      //this.selectedRewardType = Number(res);
      console.log('type = ', this.selectedRewardType);
      //this.form.controls.educationLevelForm.reset();
    }); */
    /* this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    }); */
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
