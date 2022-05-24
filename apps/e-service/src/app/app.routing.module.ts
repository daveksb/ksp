import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';

const routes: Routes = [
  { path: 'login', component: EServiceLoginComponent },
  {
    path: 'digital-license',
    loadChildren: () =>
      import('@ksp/e-service/feature/digital-license').then(
        (m) => m.EServiceFeatureDigitalLicenseModule
      ),
  },

  {
    path: 'ethic',
    loadChildren: () =>
      import('@ksp/e-service/feature/ethic').then(
        (m) => m.EServiceFeatureEthicModule
      ),
  },
  { path: '**', component: EServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
