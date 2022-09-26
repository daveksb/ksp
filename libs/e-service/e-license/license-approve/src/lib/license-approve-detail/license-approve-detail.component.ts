import { Component, OnInit } from '@angular/core';
import { UserInfoFormType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-license-approve-detail',
  templateUrl: './license-approve-detail.component.html',
  styleUrls: ['./license-approve-detail.component.scss'],
})
export class LicenseApproveDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  constructor() {}

  ngOnInit(): void {}
}
