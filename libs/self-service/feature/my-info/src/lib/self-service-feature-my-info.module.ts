import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { PersonInfoComponent } from './person-info/person-info.component';
import { PaymentHistoryItemComponent } from '@ksp/self-service/ui';
import { PageNotFoundComponent } from '@ksp/shared/new-ui';

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
    SharedUiTopNavModule,
    RouterModule.forChild(routes),
    PaymentHistoryItemComponent,
  ],
  declarations: [PaymentHistoryComponent, PersonInfoComponent],
})
export class SelfServiceFeatureMyInfoModule {}
