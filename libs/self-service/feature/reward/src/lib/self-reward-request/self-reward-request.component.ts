import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-self-reward-request',
  templateUrl: './self-reward-request.component.html',
  styleUrls: ['./self-reward-request.component.scss'],
  providers: providerFactory(SelfRewardRequestComponent),
})
export class SelfRewardRequestComponent
  extends KspFormBaseComponent
  implements OnInit
{
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
  selectedRewardType!: number;

  override form = this.fb.group({
    rewardType: [],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.rewardTypes = rewardTypes;

    this.form.controls['rewardType'].valueChanges.subscribe((res) => {
      this.selectedRewardType = Number(res);
      console.log('type = ', this.selectedRewardType);
      //this.form.controls.educationLevelForm.reset();
    });
    /* this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    }); */
  }
}

const rewardTypes = [
  {
    value: 0,
    label: `ข้อมูลขอรางวัลคุรุสภา`,
  },
  {
    value: 1,
    label: `ข้อมูลขอรางวัลครูภาษาไทยดีเด่น`,
  },
  {
    value: 2,
    label: `ข้อมูลขอรางวัลครูผู้สอนดีเด่น`,
  },
  {
    value: 3,
    label: `ข้อมูลขอรางวัลคุรุสดุดี`,
  },
  {
    value: 4,
    label: `ข้อมูลขอรางวัลครูอาวุโส`,
  },
  {
    value: 5,
    label: `ข้อมูลขอรางวัลผลงานวิจัยของคุรุสภา`,
  },
];
