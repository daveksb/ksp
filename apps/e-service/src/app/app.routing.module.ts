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
import { AuthGuard } from './auth.guard';

const routes: EthicsCustomRoute[] = [
  { path: 'login', component: EServiceLoginComponent },
  { path: 'landing', component: LandingPageComponent },
  /* {
    path: 'request-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/license-approve').then(
        (m) => m.EServiceELicenseLicenseApproveModule
      ),
    canActivate: [AuthGuard],
  }, */
  {
    path: 'request-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/request-license').then(
        (m) => m.EServiceELicenseRequestLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'renew-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/renew-license').then(
        (m) => m.EServiceELicenseRenewLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'knowledge-cert',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/knowledge-cert').then(
        (m) => m.EServiceELicenseKnowledgeCertModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'sub-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/sub-license').then(
        (m) => m.EServiceELicenseSubLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'degree-cert',
    data: { menuConfig: standardMenu, headerLabel: 'ระบบงานมาตรฐานวิชาชีพ' },
    loadChildren: () =>
      import('@ksp/e-service/standard/degree-cert').then(
        (m) => m.EServiceStandardDegreeCertModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'temp-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/temp-license').then(
        (m) => m.ELicenseTempLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'foreign-license',
    data: { menuConfig: licenseMenu, headerLabel: 'ระบบออกใบอนุญาต' },
    loadChildren: () =>
      import('@ksp/e-service/e-license/foreign-license').then(
        (m) => m.EServiceELicenseForeignLicenseModule
      ),
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },

  {
    path: 'refund',
    data: { menuConfig: refundFeeMenu, headerLabel: 'ขอคืนเงินค่าธรรมเนียม' },
    loadChildren: () =>
      import('@ksp/e-service/fee/refund-fee').then(
        (m) => m.EServiceFeeRefundFeeModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'import-test',
    data: { menuConfig: standardMenu, headerLabel: 'ขอคืนเงินค่าธรรมเนียม' },
    loadChildren: () =>
      import('@ksp/e-service/standard/test-result').then(
        (m) => m.EServiceStandardTestResultModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'import-performance',
    data: { menuConfig: standardMenu, headerLabel: 'ขอคืนเงินค่าธรรมเนียม' },
    loadChildren: () =>
      import('@ksp/e-service/standard/performance-result').then(
        (m) => m.EServiceStandardPerformanceResultModule
      ),
    canActivate: [AuthGuard],
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
