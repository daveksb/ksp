import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-praise-teacher-detail',
  templateUrl: './e-praise-teacher-detail.component.html',
  styleUrls: ['./e-praise-teacher-detail.component.scss'],
})
export class EPraiseTeacherDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  bureaus$!: Observable<any>;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    eduInfo: [],
    hiringInfo: [],
    rewardDetailInfo: [],
    rewardPunishmentInfo: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
