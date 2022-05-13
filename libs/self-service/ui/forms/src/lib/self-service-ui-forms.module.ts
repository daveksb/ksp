import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadImageComponent } from './form-upload-image/form-upload-image.component';
import { FormUserAddressComponent } from './form-user-address/form-user-address.component';
import { FormUserEducationComponent } from './form-user-education/form-user-education.component';
import { FormUserExperienceComponent } from './form-user-experience/form-user-experience.component';
import { FormUserInfoComponent } from './form-user-info/form-user-info.component';
import { FormUserPerformanceComponent } from './form-user-performance/form-user-performance.component';
import { FormUserWorkplaceComponent } from './form-user-workplace/form-user-workplace.component';
import { FormVerifyOtpComponent } from './form-verify-otp/form-verify-otp.component';
import { FormVerifyPhoneComponent } from './form-verify-phone/form-verify-phone.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormUploadImageComponent,
    FormUserAddressComponent,
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserInfoComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    FormVerifyOtpComponent,
    FormVerifyPhoneComponent,
  ],
  exports: [
    FormUploadImageComponent,
    FormUserAddressComponent,
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserInfoComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    FormVerifyOtpComponent,
    FormVerifyPhoneComponent,
  ],
})
export class SelfServiceUiFormsModule {}
