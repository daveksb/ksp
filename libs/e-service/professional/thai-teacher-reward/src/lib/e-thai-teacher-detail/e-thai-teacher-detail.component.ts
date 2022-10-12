import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-thai-teacher-detail',
  templateUrl: './e-thai-teacher-detail.component.html',
  styleUrls: ['./e-thai-teacher-detail.component.scss'],
})
export class EThaiTeacherDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

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
  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  uniqueTimestamp!: string;
  rewardFiles: any[] = [];

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    address1: [],
    address2: [],
    eduInfo: [],
    hiringInfo: [],
    rewardEthicInfo: [],
    rewardSuccessInfo: [],
    rewardDetailInfo: [],
  });

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }
}
