import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';

import { PersonInfoComponent } from './person-info/person-info.component';
import { PaymentHistoryItemComponent } from '@ksp/self-service/ui';
import { PageNotFoundComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { PerformanceResultComponent } from './performance-result/performance-result.component';
import { MatTableModule } from '@angular/material/table';

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
        path: 'payment-history',
        component: PaymentHistoryComponent,
      },
      {
        path: 'performance-result',
        component: PerformanceResultComponent,
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
  ],
  declarations: [
    PaymentHistoryComponent,
    PersonInfoComponent,
    PerformanceResultComponent,
  ],
  exports: [PerformanceResultComponent],
})
export class SelfServiceFeatureMyInfoModule {}
