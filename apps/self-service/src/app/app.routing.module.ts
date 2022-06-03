import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';
import {
  SelfServiceLicenseEditComponent,
  SelfServiceLicenseRequestComponent,
} from '@ksp/self-service/feature/license';
import { SelfServiceThaiLoginComponent } from '@ksp/self-service/feature/login';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import {
  SelfServiceRegisterStepOneComponent,
  SelfServiceRegisterStepThreeComponent,
  SelfServiceRegisterStepTwoComponent,
} from '@ksp/self-service/feature/register';

import { PrivacyPolicyComponent } from '@ksp/self-service/ui/content';

import { PaymentChannelComponent } from '@ksp/self-service/ui/payment';

const routes: Routes = [
  { path: 'home', component: SelfServiceHomeComponent },
  { path: 'login', component: SelfServiceThaiLoginComponent },
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'register-1', component: SelfServiceRegisterStepOneComponent },
  { path: 'register-2', component: SelfServiceRegisterStepTwoComponent },
  { path: 'register-3', component: SelfServiceRegisterStepThreeComponent },

  {
    path: 'my-info',
    loadChildren: () =>
      import('@ksp/self-service/feature/my-info').then(
        (m) => m.SelfServiceFeatureMyInfoModule
      ),
  },

  {
    path: 'license',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: SelfServiceLicenseRequestComponent,
      },
      {
        path: 'payment-channel',
        component: PaymentChannelComponent,
      },
      {
        path: 'edit',
        component: SelfServiceLicenseEditComponent,
      },
    ],
  },
  /* { path: '**', component: SelfServiceHomeComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
