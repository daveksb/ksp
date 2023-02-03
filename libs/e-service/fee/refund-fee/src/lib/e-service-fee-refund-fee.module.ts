import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EFeeRefundListComponent } from './e-fee-refund-list/e-fee-refund-list.component';
import { EFeeRefundDetailComponent } from './e-fee-refund-detail/e-fee-refund-detail.component';
import { EFeeRefundCreateRosterComponent } from './e-fee-refund-create-roster/e-fee-refund-create-roster.component';
import { EFeeRefundConfirmComponent } from './e-fee-refund-confirm/e-fee-refund-confirm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { FormRefundFeeDetailComponent } from '@ksp/shared/form/license';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EFeeRefundRosterDetailComponent } from './e-fee-refund-roster-detail/e-fee-refund-roster-detail.component';

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
        component: EFeeRefundListComponent,
      },
      {
        path: 'detail/:id',
        component: EFeeRefundDetailComponent,
      },
      {
        path: 'confirm',
        component: EFeeRefundConfirmComponent,
      },
      {
        path: 'create-roster',
        component: EFeeRefundCreateRosterComponent,
      },
      {
        path: 'roster-detail',
        component: EFeeRefundRosterDetailComponent,
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
    EFeeRefundListComponent,
    EFeeRefundDetailComponent,
    EFeeRefundCreateRosterComponent,
    EFeeRefundConfirmComponent,
    EFeeRefundRosterDetailComponent,
  ],
  exports: [
    EFeeRefundListComponent,
    EFeeRefundDetailComponent,
    EFeeRefundCreateRosterComponent,
    EFeeRefundConfirmComponent,
    EFeeRefundRosterDetailComponent,
  ],
})
export class EServiceFeeRefundFeeModule {}
