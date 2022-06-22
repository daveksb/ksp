import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { PersonInfoComponent } from './person-info/person-info.component';
import { PaymentHistoryBoxComponent } from '@ksp/self-service/feature/payment';

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
    PaymentHistoryBoxComponent,
  ],
  declarations: [PaymentHistoryComponent, PersonInfoComponent],
})
export class SelfServiceFeatureMyInfoModule {}
