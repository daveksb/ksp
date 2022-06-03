import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';

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
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PaymentHistoryComponent],
  exports: [PaymentHistoryComponent],
})
export class SelfServiceFeatureMyInfoModule {}
