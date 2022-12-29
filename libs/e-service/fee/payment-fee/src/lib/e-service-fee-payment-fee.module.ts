import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EFeeReceiptListComponent } from './e-fee-receipt-list/e-fee-receipt-list.component';
import { EFeeReceiptDetailComponent } from './e-fee-receipt-detail/e-fee-receipt-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EFeeRemittanceListComponent } from './e-fee-remittance-list/e-fee-remittance-list.component';
import { EFeeReceiveFeeListComponent } from './e-fee-receive-fee-list/e-fee-receive-fee-list.component';
import { EFeeAllFeePaymentComponent } from './e-fee-all-fee-payment/e-fee-all-fee-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { FormRefundFeeDetailComponent } from '@ksp/shared/form/license';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';

const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-payment',
        pathMatch: 'full',
      },
      {
        path: 'all-payment',
        component: EFeeAllFeePaymentComponent,
      },
      {
        path: 'list',
        component: EFeeReceiptListComponent,
      },
      {
        path: 'detail',
        component: EFeeReceiptDetailComponent,
      },
      {
        path: 'remittance',
        component: EFeeRemittanceListComponent,
      },
      {
        path: 'receive',
        component: EFeeReceiveFeeListComponent,
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
    MatDatepickerModule,
    ThaiDatePipe,
    ReactiveFormsModule,
    ValidateKspRequestComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    EFeeReceiptListComponent,
    EFeeReceiptDetailComponent,
    EFeeRemittanceListComponent,
    EFeeReceiveFeeListComponent,
    EFeeAllFeePaymentComponent,
  ],
  exports: [
    EFeeReceiptListComponent,
    EFeeReceiptDetailComponent,
    EFeeRemittanceListComponent,
    EFeeReceiveFeeListComponent,
    EFeeAllFeePaymentComponent,
  ],
})
export class EServiceFeePaymentFeeModule {}
