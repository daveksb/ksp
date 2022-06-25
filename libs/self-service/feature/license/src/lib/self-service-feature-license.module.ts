import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LicenseRequestComponent } from './license-request/license-request.component';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { LicenseEditComponent } from './license-edit/license-edit.component';
import {
  BottomNavComponent,
  SharedMenuModule,
  TopNavComponent,
} from '@ksp/shared/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import {
  PaymentChannelComponent,
  PromptpayComponent,
} from '@ksp/self-service/feature/payment';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelfServiceLicenseInfoComponent } from '@ksp/self-service/ui';
import { PageNotFoundComponent } from '@ksp/shared/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    SharedMenuModule,
    MatTabsModule,
    MatExpansionModule,
    TopNavComponent,
    RouterModule.forChild(routes),
    SelfServiceLicenseInfoComponent,
    BottomNavComponent,
    ReactiveFormsModule,
    FormsModule,
    FormUploadImageComponent,
  ],
  declarations: [LicenseRequestComponent, LicenseEditComponent],
})
export class SelfServiceFeatureLicenseModule {}
