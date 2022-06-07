import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadImageComponent } from './form-upload-image/form-upload-image.component';

import { FormUserEducationComponent } from './form-user-education/form-user-education.component';
import { FormUserExperienceComponent } from './form-user-experience/form-user-experience.component';
import { FormUserPerformanceComponent } from './form-user-performance/form-user-performance.component';
import { FormUserWorkplaceComponent } from './form-user-workplace/form-user-workplace.component';
import { FormVerifyOtpComponent } from './form-verify-otp/form-verify-otp.component';
import { FormVerifyPhoneComponent } from './form-verify-phone/form-verify-phone.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    SharedUiFormModule,
    MatListModule,
  ],
  declarations: [
    FormUploadImageComponent,
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    FormVerifyOtpComponent,
    FormVerifyPhoneComponent,
  ],
  exports: [
    FormUploadImageComponent,
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    FormVerifyOtpComponent,
    FormVerifyPhoneComponent,
  ],
})
export class SelfServiceUiFormsModule {}
