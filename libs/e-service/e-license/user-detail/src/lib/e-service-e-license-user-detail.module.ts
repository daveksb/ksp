import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestHeaderInfoComponent } from '@ksp/shared/new-ui';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';

import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    SharedFormOthersModule,
    EServiceUiLicenseCheckModule,
    MatDialogModule,
    RequestHeaderInfoComponent,
    FormRequesterInfoComponent,
    FormCoordinatorInfoComponent,
    TopNavComponent,
    SharedUiBottomMenuModule,
  ],
  declarations: [UserDetailComponent],
  exports: [UserDetailComponent],
})
export class EServiceELicenseUserDetailModule {}
