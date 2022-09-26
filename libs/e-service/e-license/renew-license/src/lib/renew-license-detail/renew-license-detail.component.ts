import { Component, OnInit } from '@angular/core';
import { UserInfoFormType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-renew-license-detail',
  templateUrl: './renew-license-detail.component.html',
  styleUrls: ['./renew-license-detail.component.scss'],
})
export class RenewLicenseDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  constructor() {}

  ngOnInit(): void {}
}
