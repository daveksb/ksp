import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from '@ksp/e-service/feature/landing-page';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';
import { EthicsCustomRoute } from '@ksp/shared/interface';
import {
  ethicsMenu,
  licenseMenu,
  professionalMenu,
  refundFeeMenu,
  standardMenu,
} from './app.menu.config';

const routes: EthicsCustomRoute[] = [
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
        (m) => m.ELicenseTempLicenseModule
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
    path: 'investigation',
    data: {
      ethicsMode: 'investigation',
      menuConfig: ethicsMenu,
      headerLabel: 'ระบบงานจรรยาบรรณ',
    },
    loadChildren: () =>
      import('@ksp/e-service/ethics/investigation').then(
        (m) => m.EServiceEthicsInvestigationModule
      ),
  },
  {
    path: 'accusation',
    data: {
      ethicsMode: 'accusation',
      menuConfig: ethicsMenu,
      headerLabel: 'ระบบงานจรรยาบรรณ',
    },
    loadChildren: () =>
      import('@ksp/e-service/ethics/accusation').then(
        (m) => m.EServiceEthicsAccusationModule
      ),
  },
  {
    path: 'inquiry',
    data: {
      ethicsMode: 'inquiry',
      menuConfig: ethicsMenu,
      headerLabel: 'ระบบงานจรรยาบรรณ',
    },
    loadChildren: () =>
      import('@ksp/e-service/ethics/inquiry').then(
        (m) => m.EServiceEthicsInquiryModule
      ),
  },
  {
    path: 'publish',
    data: {
      ethicsMode: 'publish',
      menuConfig: ethicsMenu,
      headerLabel: 'ระบบงานจรรยาบรรณ',
    },
    loadChildren: () =>
      import('@ksp/e-service/ethics/publish').then(
        (m) => m.EServiceEthicsPublishModule
      ),
  },
  {
    path: 'approve-new-user',
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
    path: 'manage-current-user',
    data: {
      menuConfig: licenseMenu,
      headerLabel: 'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/manage-current-user').then(
        (m) => m.EServiceELicenseManageCurrentUserModule
      ),
  },

  {
    path: 'one-school-one-innovation',
    data: {
      menuConfig: professionalMenu,
      headerLabel:
        'รางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation: OSOI)',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/one-school-one-innovation').then(
        (m) => m.EServiceProfessionalOneSchoolOneInnovationModule
      ),
  },

  {
    path: 'refund',
    data: { menuConfig: refundFeeMenu, headerLabel: 'ขอคืนเงินค่าธรรมเนียม' },
    loadChildren: () =>
      import('@ksp/e-service/fee/refund-fee').then(
        (m) => m.EServiceFeeRefundFeeModule
      ),
  },

  { path: '', component: EServiceLoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
