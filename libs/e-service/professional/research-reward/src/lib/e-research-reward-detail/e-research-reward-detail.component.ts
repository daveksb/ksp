import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-research-reward-detail',
  templateUrl: './e-research-reward-detail.component.html',
  styleUrls: ['./e-research-reward-detail.component.scss'],
})
export class EResearchRewardDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  provinces$!: Observable<any>;
  amphurs$!: Observable<any>;
  tumbols$!: Observable<any>;
  bureaus$!: Observable<any>;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    workplace: [],
    rewardResearcherInfo: [],
    rewardResearchInfo: [],
    rewardResearchHistory: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
