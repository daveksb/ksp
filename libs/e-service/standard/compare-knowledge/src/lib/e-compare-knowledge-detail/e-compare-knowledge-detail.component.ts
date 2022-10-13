import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-compare-knowledge-detail',
  templateUrl: './e-compare-knowledge-detail.component.html',
  styleUrls: ['./e-compare-knowledge-detail.component.scss'],
})
export class ECompareKnowledgeDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  provinces3$!: Observable<any>;
  bureau$!: Observable<any>;

  tumbols1$!: Observable<any>;
  tumbols2$!: Observable<any>;
  tumbols3$!: Observable<any>;
  amphurs1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  amphurs3$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    testResultCompareInfo: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  choices = [
    {
      name: 'ครบถ้วน และถูกต้อง',
      value: 2,
    },
    {
      name: 'ไม่ครบถ้วน และถูกต้อง',
      value: 3,
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
