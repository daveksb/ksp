import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-best-teacher-detail',
  templateUrl: './e-best-teacher-detail.component.html',
  styleUrls: ['./e-best-teacher-detail.component.scss'],
})
export class EBestTeacherDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  provinces3$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  provinces4$!: Observable<any>;
  amphurs4$!: Observable<any>;
  tumbols4$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    rewardTeacherInfo: [],
    eduInfo: [],
    teachingInfo: [],
    rewardDetailInfo: [],
    phone: [],
    fax: [],
    email: [],
    website: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
