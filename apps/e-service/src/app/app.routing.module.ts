import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';

const routes: Routes = [
  { path: 'login', component: EServiceLoginComponent },
  {
    path: 'e-license',
    loadChildren: () =>
      import('@ksp/e-service/domain/e-license').then(
        (m) => m.EServiceDomainELicenseModule
      ),
  },
  {
    path: 'ethic',
    loadChildren: () =>
      import('@ksp/e-service/feature/ethic').then(
        (m) => m.EServiceFeatureEthicModule
      ),
  },
  { path: '', component: EServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
