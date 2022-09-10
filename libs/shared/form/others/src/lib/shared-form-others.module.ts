import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddressComponent } from './form-address/form-address.component';
import { FormSchoolAddressComponent } from './form-school-address/form-school-address.component';
import { FormEducationInfoComponent } from './form-education-info/form-education-info.component';
import { FormTeachingInfoComponent } from './form-teaching-info/form-teaching-info.component';
import { FormReasonInfoComponent } from './form-reason-info/form-reason-info.component';
import { FormAttachmentComponent } from './form-attachment/form-attachment.component';
import { FormUserInfoComponent } from './form-user-info/form-user-info.component';
import { FormForeignIdComponent } from './form-foreign-id/form-foreign-id.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { FormHiringInfoComponent } from './form-hiring-info/form-hiring-info.component';
import { FormVisaInfoComponent } from './form-visa-info/form-visa-info.component';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    RequestHeaderInfoComponent,
    FileUploadComponent,
  ],
  declarations: [
    FormAddressComponent,
    FormSchoolAddressComponent,
    FormEducationInfoComponent,
    FormTeachingInfoComponent,
    FormReasonInfoComponent,
    FormAttachmentComponent,
    FormUserInfoComponent,
    FormForeignIdComponent,
    FormHiringInfoComponent,
    FormVisaInfoComponent,
  ],
  exports: [
    FormAddressComponent,
    FormSchoolAddressComponent,
    FormEducationInfoComponent,
    FormTeachingInfoComponent,
    FormReasonInfoComponent,
    FormAttachmentComponent,
    FormUserInfoComponent,
    FormForeignIdComponent,
    FormHiringInfoComponent,
    FormVisaInfoComponent,
  ],
})
export class SharedFormOthersModule {}
