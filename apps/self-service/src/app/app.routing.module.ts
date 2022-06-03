import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';

import { SelfServiceThaiLoginComponent } from '@ksp/self-service/feature/login';

import {
  SelfServiceRegisterStepOneComponent,
  SelfServiceRegisterStepThreeComponent,
  SelfServiceRegisterStepTwoComponent,
} from '@ksp/self-service/feature/register';

import { PrivacyPolicyComponent } from '@ksp/self-service/ui/content';

const routes: Routes = [
  { path: 'home', component: SelfServiceHomeComponent },
  { path: 'login', component: SelfServiceThaiLoginComponent },
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'register-1', component: SelfServiceRegisterStepOneComponent },
  { path: 'register-2', component: SelfServiceRegisterStepTwoComponent },
  { path: 'register-3', component: SelfServiceRegisterStepThreeComponent },

  {
    path: 'license',
    loadChildren: () =>
      import('@ksp/self-service/feature/license').then(
        (m) => m.SelfServiceFeatureLicenseModule
      ),
  },

  {
    path: 'my-info',
    loadChildren: () =>
      import('@ksp/self-service/feature/my-info').then(
        (m) => m.SelfServiceFeatureMyInfoModule
      ),
  },

  { path: '**', component: SelfServiceHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
