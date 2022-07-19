import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundListComponent } from './refund-list/refund-list.component';
import { RefundApproveComponent } from './refund-approve/refund-approve.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RefundDetailComponent } from './refund-detail/refund-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: RefundListComponent,
      },

      {
        path: 'approve',
        component: RefundApproveComponent,
      },
      {
        path: 'detail',
        component: RefundDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    RefundListComponent,
    RefundDetailComponent,
    RefundApproveComponent,
  ],
  exports: [RefundListComponent, RefundDetailComponent, RefundApproveComponent],
})
export class EServiceFeeRefundFeeModule {}
