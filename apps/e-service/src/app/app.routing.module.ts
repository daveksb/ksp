import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '@ksp/e-service/feature/landing-page';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';
import { ethicsMenu, licenseMenu, standardMenu } from './app.menu.config';

const routes: Routes = [
  { path: 'login', component: EServiceLoginComponent },
  { path: 'landing', component: LandingPageComponent },
  {
    path: 'degree-cert',
    data: { menuConfig: standardMenu, headerLabel: 'ระบบงานมาตรฐานวิชาชีพ' },
    loadChildren: () =>
      import('@ksp/e-service/standard/degree-cert').then(
        (m) => m.EServiceStandardDegreeCertModule
      ),
  },
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
      import('@ksp/e-service/ethics/accusation').then(
        (m) => m.EServiceEthicsAccusationModule
      ),
  },
  {
    path: 'publish',
    data: { menuConfig: ethicsMenu, headerLabel: 'ระบบงานจรรยาบรรณ' },
    loadChildren: () =>
      import('@ksp/e-service/ethics/publish').then(
        (m) => m.EServiceEthicsPublishModule
      ),
  },
  {
    path: 'user-approvement',
    data: {
      menuConfig: licenseMenu,
      headerLabel:
        'ใบคำขอรหัสเข้าใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
      headerDetail: ' > ตรวจสอบและอนุมัติใบคำขอรหัสเข้าใช้งาน',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/approve-new-user').then(
        (m) => m.EServiceELicenseApproveNewUserModule
      ),
  },
  {
    path: 'user-management',
    data: {
      menuConfig: licenseMenu,
      headerLabel: 'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/user-management').then(
        (m) => m.EServiceELicenseUserManagementModule
      ),
  },

  { path: '', component: EServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
