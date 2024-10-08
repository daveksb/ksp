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
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { FormHiringInfoComponent } from './form-hiring-info/form-hiring-info.component';
import { FormVisaInfoComponent } from './form-visa-info/form-visa-info.component';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormMultiAttachmentComponent } from './form-multi-attachment/form-multi-attachment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { QualificationExperienceInfoComponent } from './qualification-experience-info/qualification-experience-info.component';
import { FileCommentPipe } from '@ksp/shared/pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
    RequestHeaderInfoComponent,
    FileUploadComponent,
    AddRowButtonComponent,
    FileCommentPipe,
  ],
  declarations: [
    FormAddressComponent,
    FormSchoolAddressComponent,
    FormEducationInfoComponent,
    FormTeachingInfoComponent,
    FormReasonInfoComponent,
    FormAttachmentComponent,
    FormMultiAttachmentComponent,
    FormUserInfoComponent,
    FormForeignIdComponent,
    FormHiringInfoComponent,
    FormVisaInfoComponent,
    QualificationExperienceInfoComponent,
  ],
  exports: [
    FormAddressComponent,
    FormSchoolAddressComponent,
    FormEducationInfoComponent,
    FormTeachingInfoComponent,
    FormReasonInfoComponent,
    FormAttachmentComponent,
    FormMultiAttachmentComponent,
    FormUserInfoComponent,
    FormForeignIdComponent,
    FormHiringInfoComponent,
    FormVisaInfoComponent,
    QualificationExperienceInfoComponent,
  ],
})
export class SharedFormOthersModule {}
