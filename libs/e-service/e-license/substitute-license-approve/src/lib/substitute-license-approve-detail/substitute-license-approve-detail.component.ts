import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-substitute-license-approve-detail',
  templateUrl: './substitute-license-approve-detail.component.html',
  styleUrls: ['./substitute-license-approve-detail.component.scss'],
})
export class SubstituteLicenseApproveDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;
  approveChoices = choices;

  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;
  disableNextButton = false;
  eduFiles: any[] = [];
  experienceFiles: any[] = [];
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  provinces$!: Observable<any>;

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
    education: [],
    experience: [],
  });

  form2 = this.fb.group({
    verifyResult: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}

const choices = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 2,
  },
  {
    name: 'ไม่ครบถ้วน และถูกต้อง',
    value: 3,
  },
];
