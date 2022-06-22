import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LicenseRequestComponent } from './license-request/license-request.component';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { LicenseEditComponent } from './license-edit/license-edit.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import {
  PaymentChannelComponent,
  PromptpayComponent,
} from '@ksp/self-service/feature/payment';
import { MatExpansionModule } from '@angular/material/expansion';
import { LicenseInfoComponent } from '@ksp/self-service/ui';
import { PageNotFoundComponent } from '@ksp/shared/new-ui';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: LicenseRequestComponent,
      },
      {
        path: 'edit',
        component: LicenseEditComponent,
      },
      {
        path: 'payment-channel',
        component: PaymentChannelComponent,
      },
      {
        path: 'payment-promptpay',
        component: PromptpayComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceFormModule,
    SharedFormOthersModule,
    SharedUiSideMenuModule,
    MatTabsModule,
    MatExpansionModule,
    SharedUiTopNavModule,
    RouterModule.forChild(routes),
    LicenseInfoComponent,
  ],
  declarations: [LicenseRequestComponent, LicenseEditComponent],
})
export class SelfServiceFeatureLicenseModule {}
