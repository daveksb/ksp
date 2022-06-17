import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui/request-header-info';

@NgModule({
  imports: [
    CommonModule,
    SharedFormOthersModule,
    EServiceUiLicenseCheckModule,
    MatDialogModule,
    RequestHeaderInfoComponent,
  ],
  declarations: [UserDetailComponent],
  exports: [UserDetailComponent],
})
export class EServiceELicenseUserDetailModule {}
