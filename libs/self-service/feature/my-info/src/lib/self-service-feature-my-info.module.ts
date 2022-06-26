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
import { FormUploadImageComponent, SelfServiceFormModule } from '@ksp/self-service/form';

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
    FormUploadImageComponent
  ],
  declarations: [PaymentHistoryComponent, PersonInfoComponent],
})
export class SelfServiceFeatureMyInfoModule {}
