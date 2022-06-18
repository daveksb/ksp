import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui/request-header-info';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

@NgModule({
  imports: [
    CommonModule,
    SharedFormOthersModule,
    EServiceUiLicenseCheckModule,
    MatDialogModule,
    RequestHeaderInfoComponent,
    FormRequesterInfoComponent,
    FormCoordinatorInfoComponent,
    SharedUiTopNavModule
  ],
  declarations: [UserDetailComponent],
  exports: [UserDetailComponent],
})
export class EServiceELicenseUserDetailModule {}
