import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    SharedUiFormModule,
    EServiceUiLicenseCheckModule,
    MatDialogModule,
  ],
  declarations: [UserDetailComponent],
  exports: [UserDetailComponent],
})
export class EServiceELicenseUserDetailModule {}
