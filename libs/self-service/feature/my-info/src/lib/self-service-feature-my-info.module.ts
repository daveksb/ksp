import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';

import { PersonInfoComponent } from './person-info/person-info.component';
import {
  PaymentHistoryItemComponent,
  TestResultTableComponent,
} from '@ksp/self-service/ui';
import { AddRowButtonComponent, PageNotFoundComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { PerformanceResultComponent } from './performance-result/performance-result.component';
import { MatTableModule } from '@angular/material/table';
import { WorkplaceInfoComponent } from './workplace-info/workplace-info.component';
import { EducationInfoComponent } from './education-info/education-info.component';
import { ProfessionExperienceComponent } from './profession-experience/profession-experience.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormEducationLevelModule } from '@ksp/shared/form/education-level';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Route[] = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'payment-history',
      },
      {
        path: 'person-info',
        component: PersonInfoComponent,
      },

      {
        path: 'workplace-info',
        component: WorkplaceInfoComponent,
      },
      {
        path: 'education-info',
        component: EducationInfoComponent,
      },
      {
        path: 'profession-experience',
        component: ProfessionExperienceComponent,
      },
      {
        path: 'performance-result',
        component: PerformanceResultComponent,
      },
      {
        path: 'address-info',
        component: AddressInfoComponent,
      },
      {
        path: 'payment-history',
        component: PaymentHistoryComponent,
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
    TopNavComponent,
    RouterModule.forChild(routes),
    PaymentHistoryItemComponent,
    ReactiveFormsModule,
    MatTableModule,
    FormUploadImageComponent,
    SelfServiceFormModule,
    MatTabsModule,
    TestResultTableComponent,
    AddRowButtonComponent,
    SharedFormEducationLevelModule,
    SharedFormOthersModule,
  ],
  declarations: [
    PaymentHistoryComponent,
    PersonInfoComponent,
    PerformanceResultComponent,
    WorkplaceInfoComponent,
    EducationInfoComponent,
    ProfessionExperienceComponent,
    AddressInfoComponent,
  ],
  exports: [
    PerformanceResultComponent,
    WorkplaceInfoComponent,
    EducationInfoComponent,
    ProfessionExperienceComponent,
    AddressInfoComponent,
  ],
})
export class SelfServiceFeatureMyInfoModule {}
