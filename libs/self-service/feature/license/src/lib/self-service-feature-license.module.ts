import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LicenseRequestComponent } from './license-request/license-request.component';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { LicenseEditComponent } from './license-edit/license-edit.component';
import {
  BottomNavComponent,
  SharedMenuModule,
  TopNavComponent,
} from '@ksp/shared/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import {
  PaymentChannelComponent,
  PromptpayComponent,
} from '@ksp/self-service/feature/payment';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { PageNotFoundComponent } from '@ksp/shared/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LicenseRequestSchoolManagerComponent } from './license-request-school-manager/license-request-school-manager.component';
import { LicenseRequestEducationManagerComponent } from './license-request-education-manager/license-request-education-manager.component';
import { LicenseRequestStudySupervisionComponent } from './license-request-study-supervision/license-request-study-supervision.component';
import { LicenseRequestForeignComponent } from './license-request-foreign/license-request-foreign.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LicenseForeignAgreementComponent } from './license-foreign-agreement/license-foreign-agreement.component';
import { EditLicenseComponent } from '@ksp/shared/form/license';
import { LicenseRequestThaiComponent } from './license-request-thai/license-request-thai.component';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      /* {
        path: 'teacher',
        component: LicenseRequestThaiComponent,
      },
      {
        path: 'foreign-teacher',
        component: LicenseRequestForeignComponent,
      },
      {
        path: 'school-manager',
        component: LicenseRequestSchoolManagerComponent,
      },
      {
        path: 'education-manager',
        component: LicenseRequestEducationManagerComponent,
      },
      {
        path: 'study-supervision',
        component: LicenseRequestStudySupervisionComponent,
      }, */
      {
        path: 'request/:type',
        component: LicenseRequestComponent,
      },
      {
        path: 'agreement',
        component: LicenseForeignAgreementComponent,
      },
      {
        path: 'edit',
        component: LicenseEditComponent,
      },
      {
        path: 'payment-channel',
        component: PaymentChannelComponent,
      },
      {
        path: 'payment-promptpay',
        component: PromptpayComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceFormModule,
    SharedFormOthersModule,
    SharedMenuModule,
    MatTabsModule,
    MatExpansionModule,
    TopNavComponent,
    RouterModule.forChild(routes),
    SelfServiceLicenseInfoComponent,
    BottomNavComponent,
    ReactiveFormsModule,
    FormsModule,
    FormUploadImageComponent,
    MatStepperModule,
    RequestStatusComponent,
    EditLicenseComponent,
  ],
  declarations: [
    LicenseRequestComponent,
    LicenseEditComponent,
    LicenseRequestSchoolManagerComponent,
    LicenseRequestEducationManagerComponent,
    LicenseRequestStudySupervisionComponent,
    LicenseRequestForeignComponent,
    LicenseForeignAgreementComponent,
    LicenseRequestThaiComponent,
  ],
  exports: [
    LicenseRequestSchoolManagerComponent,
    LicenseRequestEducationManagerComponent,
    LicenseRequestStudySupervisionComponent,
    LicenseRequestForeignComponent,
    LicenseForeignAgreementComponent,
    LicenseRequestThaiComponent,
  ],
})
export class SelfServiceFeatureLicenseModule {}
