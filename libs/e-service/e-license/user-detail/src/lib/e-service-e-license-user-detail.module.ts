import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';
import { BottomNavComponent } from '@ksp/shared/menu';
import { TopNavComponent } from '@ksp/shared/menu';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedFormOthersModule,
    ReactiveFormsModule,
    MatDialogModule,
    RequestHeaderInfoComponent,
    FormRequesterInfoComponent,
    FormCoordinatorInfoComponent,
    TopNavComponent,
    BottomNavComponent,
    LicenseCheckComponent,
  ],
  declarations: [UserDetailComponent],
})
export class EServiceELicenseUserDetailModule {}
