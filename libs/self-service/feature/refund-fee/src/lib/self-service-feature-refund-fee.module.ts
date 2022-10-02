import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundFeeRequestComponent } from './refund-fee-request/refund-fee-request.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { TopNavComponent } from '@ksp/shared/menu';
import { RequestStatusComponent } from '@ksp/self-service/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { FormRefundFeeDetailComponent } from '@ksp/shared/form/license';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: RefundFeeRequestComponent,
      },
      {
        path: 'request/:id',
        component: RefundFeeRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    RequestStatusComponent,
    SharedFormOthersModule,
    FormRefundFeeDetailComponent,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RefundFeeRequestComponent],
  exports: [RefundFeeRequestComponent],
})
export class SelfServiceFeatureRefundFeeModule {}
