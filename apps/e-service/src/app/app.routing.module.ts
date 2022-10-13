import { NgModule, ɵɵclassMapInterpolate3 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from '@ksp/e-service/feature/landing-page';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';
import { EthicsCustomRoute } from '@ksp/shared/interface';
import {
  ethicsMenu,
  eLicenseMenu,
  professionalMenu,
  refundFeeMenu,
  standardMenu,
} from './app.menu.config';
import { AuthGuard } from './auth.guard';

const routes: EthicsCustomRoute[] = [
  { path: 'login', component: EServiceLoginComponent },
  { path: 'landing', component: LandingPageComponent },

  {
    path: 'request-license',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา ',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/request-license').then(
        (m) => m.EServiceELicenseRequestLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'renew-license',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา ',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/renew-license').then(
        (m) => m.EServiceELicenseRenewLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-license',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา ',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/edit-license').then(
        (m) => m.EServiceELicenseEditLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'document-delivery',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/document-delivery').then(
        (m) => m.EServiceELicenseDocumentDeliveryModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'knowledge-cert',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/knowledge-cert').then(
        (m) => m.EServiceELicenseKnowledgeCertModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'sub-license',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/substitute-license').then(
        (m) => m.EServiceELicenseSubstituteLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'temp-license',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/temp-license').then(
        (m) => m.ELicenseTempLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'foreign-license',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/foreign-license').then(
        (m) => m.EServiceELicenseForeignLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'school',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/school-user').then(
        (m) => m.EServiceELicenseSchoolUserModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'self',
    data: {
      menuConfig: eLicenseMenu,
      headerLabel: 'ระบบใบอนุญาตประกอบวิชาชีพทางการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/e-service/e-license/self-user').then(
        (m) => m.EServiceELicenseSelfUserModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'import-test',
    data: { menuConfig: standardMenu, headerLabel: 'ระบบงานมาตรฐานวิชาชีพ' },
    loadChildren: () =>
      import('@ksp/e-service/standard/test-result').then(
        (m) => m.EServiceStandardTestResultModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'import-performance',
    data: {
      menuConfig: standardMenu,
      headerLabel: 'ระบบงานมาตรฐานวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/standard/performance-result').then(
        (m) => m.EServiceStandardPerformanceResultModule
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
    path: 'qualification-approve',
    data: {
      menuConfig: standardMenu,
      headerLabel: 'ระบบงานมาตรฐานวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/standard/qualification-approve').then(
        (m) => m.EServiceStandardQualificationApproveModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'compare-knowledge',
    data: {
      menuConfig: standardMenu,
      headerLabel: 'ระบบงานมาตรฐานวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/standard/compare-knowledge').then(
        (m) => m.EServiceStandardCompareKnowledgeModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'knowledge-cert',
    data: {
      menuConfig: standardMenu,
      headerLabel: 'ระบบงานมาตรฐานวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/standard/knowledge-cert').then(
        (m) => m.EServiceStandardKnowledgeCertModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'investigation',
    data: {
      ethicsMode: 'investigation',
      menuConfig: ethicsMenu,
      headerLabel: 'ระบบงานจรรยาบรรณวิชาชีพ',
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
      headerLabel: 'ระบบงานจรรยาบรรณวิชาชีพ',
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
      headerLabel: 'ระบบงานจรรยาบรรณวิชาชีพ',
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
      headerLabel: 'ระบบงานจรรยาบรรณวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/ethics/publish').then(
        (m) => m.EServiceEthicsPublishModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'one-school-one-innovation',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/one-school-one-innovation').then(
        (m) => m.EServiceProfessionalOneSchoolOneInnovationModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'enable-reward',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/enable-reward-request').then(
        (m) => m.EServiceProfessionalEnableRewardRequestModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'teacher-council',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/teacher-council-reward').then(
        (m) => m.EServiceProfessionalTeacherCouncilRewardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'thai-teacher',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/thai-teacher-reward').then(
        (m) => m.EServiceProfessionalThaiTeacherRewardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'best-teacher',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/best-teacher-reward').then(
        (m) => m.EServiceProfessionalBestTeacherRewardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'research-reward',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/research-reward').then(
        (m) => m.EServiceProfessionalResearchRewardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'praise-teacher',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/praise-teacher-reward').then(
        (m) => m.EServiceProfessionalPraiseTeacherRewardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'senior-teacher',
    data: {
      menuConfig: professionalMenu,
      headerLabel: 'ระบบงานพัฒนาวิชาชีพและยกย่องวิชาชีพ',
    },
    loadChildren: () =>
      import('@ksp/e-service/professional/senior-teacher-reward').then(
        (m) => m.EServiceProfessionalSeniorTeacherRewardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'refund',
    data: { menuConfig: refundFeeMenu, headerLabel: 'ระบบงานค่าธรรมเนียม' },
    loadChildren: () =>
      import('@ksp/e-service/fee/refund-fee').then(
        (m) => m.EServiceFeeRefundFeeModule
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
