import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { LicenseRequestComponent } from './license-request/license-request.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { LicenseEditComponent } from './license-edit/license-edit.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import {
  PaymentChannelComponent,
  PromptpayComponent,
} from '@ksp/self-service/ui/payment';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { MatExpansionModule } from '@angular/material/expansion';

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
    SelfServiceUiMenuModule,
    SelfServiceUiFormsModule,
    SharedFormOthersModule,
    SharedUiSideMenuModule,
    MatTabsModule,
    MatExpansionModule,
    SharedUiTopNavModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LicenseRequestComponent, LicenseEditComponent],
  exports: [LicenseRequestComponent, LicenseEditComponent],
})
export class SelfServiceFeatureLicenseModule {}
