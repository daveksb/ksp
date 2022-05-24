import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@ksp/e-service/feature/login').then(
        (m) => m.EServiceFeatureLoginModule
      ),
  },
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
      import('@ksp/e-service/domain/ethic').then(
        (m) => m.eServiceDomainEthicRoutes
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
