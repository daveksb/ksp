import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SelfServiceLicenseRequestComponent } from './self-service-license-request/self-service-license-request.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { SelfServiceLicenseEditComponent } from './self-service-license-edit/self-service-license-edit.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { PaymentChannelComponent } from '@ksp/self-service/ui/payment';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: SelfServiceLicenseRequestComponent,
      },
      {
        path: 'edit',
        component: SelfServiceLicenseEditComponent,
      },
      {
        path: 'payment-channel',
        component: PaymentChannelComponent,
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
    SharedUiFormModule,
    SharedUiSideMenuModule,
    MatTabsModule,
    SharedUiTopNavModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SelfServiceLicenseRequestComponent,
    SelfServiceLicenseEditComponent,
  ],
  exports: [
    SelfServiceLicenseRequestComponent,
    SelfServiceLicenseEditComponent,
  ],
})
export class SelfServiceFeatureLicenseModule {}
