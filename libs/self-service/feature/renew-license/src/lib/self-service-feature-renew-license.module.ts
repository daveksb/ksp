import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenewLicenseRequestComponent } from './renew-license-request/renew-license-request.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: RenewLicenseRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    FormUploadImageComponent,
    TopNavComponent,
    SelfServiceLicenseInfoComponent,
    SharedFormOthersModule,
    SelfServiceFormModule,
    RequestStatusComponent,
    RouterModule.forChild(routes),
  ],
  declarations: [RenewLicenseRequestComponent],
  exports: [RenewLicenseRequestComponent],
})
export class SelfServiceFeatureRenewLicenseModule {}
