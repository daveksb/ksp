import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '@ksp/e-service/feature/landing-page';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';
import { ethicsMenu, licenseMenu } from './app.menu.config';

const routes: Routes = [
  { path: 'login', component: EServiceLoginComponent },
  { path: 'landing', component: LandingPageComponent },
  {
    path: 'temp-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/temp-license').then(
        (m) => m.EServiceELicenseTempLicenseModule
      ),
  },
  {
    path: 'foreign-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/foreign-license').then(
        (m) => m.EServiceELicenseForeignLicenseModule
      ),
  },
  {
    path: 'ethics',
    data: { menuConfig: ethicsMenu, headerLabel: 'ระบบงานจรรยาบรรณ' },
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
