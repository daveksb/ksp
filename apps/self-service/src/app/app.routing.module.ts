import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';
import { SelfServiceThaiLoginComponent } from '@ksp/self-service/feature/login';

const routes: Routes = [
  { path: 'landing', component: SelfServiceHomeComponent },
  { path: 'login', component: SelfServiceThaiLoginComponent },
  {
    path: 'register',
    loadChildren: () =>
      import('@ksp/self-service/feature/register').then(
        (m) => m.SelfServiceFeatureRegisterModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@ksp/self-service/feature/home').then(
        (m) => m.SelfServiceFeatureHomeModule
      ),
  },
  {
    path: 'license',
    loadChildren: () =>
      import('@ksp/self-service/feature/license').then(
        (m) => m.SelfServiceFeatureLicenseModule
      ),
  },
  {
    path: 'renew-license',
    loadChildren: () =>
      import('@ksp/self-service/feature/renew-license').then(
        (m) => m.SelfServiceFeatureRenewLicenseModule
      ),
  },
  {
    path: 'refund-fee',
    loadChildren: () =>
      import('@ksp/self-service/feature/refund-fee').then(
        (m) => m.SelfServiceFeatureRefundFeeModule
      ),
  },
  {
    path: 'substitute-license',
    loadChildren: () =>
      import('@ksp/self-service/feature/substitute-license').then(
        (m) => m.SelfServiceFeatureSubstituteLicenseModule
      ),
  },
  {
    path: 'self-improvement',
    loadChildren: () =>
      import('@ksp/self-service/feature/self-improve-activity').then(
        (m) => m.SelfServiceFeatureSelfImproveActivityModule
      ),
  },
  {
    path: 'reward',
    loadChildren: () =>
      import('@ksp/self-service/feature/reward').then(
        (m) => m.SelfServiceFeatureRewardModule
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
