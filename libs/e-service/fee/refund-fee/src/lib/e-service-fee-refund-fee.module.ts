import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundListComponent } from './refund-list/refund-list.component';
import { RefundApproveComponent } from './refund-approve/refund-approve.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RefundDetailComponent } from './refund-detail/refund-detail.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { FormRefundFeeDetailComponent } from '@ksp/shared/form/license';
import { MatDialogModule } from '@angular/material/dialog';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { MatTableModule } from '@angular/material/table';
import { RefundConfirmComponent } from './refund-confirm/refund-confirm.component';

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
      {
        path: 'confirm',
        component: RefundConfirmComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    TopNavComponent,
    FormRefundFeeDetailComponent,
    MatDialogModule,
    LicenseCheckComponent,
    BottomNavComponent,
    MatTableModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RefundListComponent,
    RefundDetailComponent,
    RefundApproveComponent,
    RefundConfirmComponent,
  ],
  exports: [
    RefundListComponent,
    RefundDetailComponent,
    RefundApproveComponent,
    RefundConfirmComponent,
  ],
})
export class EServiceFeeRefundFeeModule {}
