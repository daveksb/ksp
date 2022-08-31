import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadImageComponent } from './form-upload-image/form-upload-image.component';
import { FormUserEducationComponent } from './form-user-education/form-user-education.component';
import { FormUserExperienceComponent } from './form-user-experience/form-user-experience.component';
import { FormUserPerformanceComponent } from './form-user-performance/form-user-performance.component';
import { FormUserWorkplaceComponent } from './form-user-workplace/form-user-workplace.component';
import { FormVerifyOtpComponent } from './form-verify-otp/form-verify-otp.component';
import { FormVerifyPhoneComponent } from './form-verify-phone/form-verify-phone.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { SharedFormEducationLevelModule } from '@ksp/shared/form/education-level';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { StandardWorkingComponent } from './standard-working/standard-working.component';
import { StandardWorkingTeacherComponent } from './standard-working-teacher/standard-working-teacher.component';
import { StandardWorkingNonTeacherComponent } from './standard-working-non-teacher/standard-working-non-teacher.component';
import { SubstituteObjectiveComponent } from './substitute-objective/substitute-objective.component';
import { SchoolManagerExperienceComponent } from './school-manager-experience/school-manager-experience.component';
import { EducationManagerExperienceComponent } from './education-manager-experience/education-manager-experience.component';
import { StudySupervisionExperienceComponent } from './study-supervision-experience/study-supervision-experience.component';
import { ForeignLicenseStepOneComponent } from './foreign-license-step-one/foreign-license-step-one.component';
import { ForeignLicenseStepTwoComponent } from './foreign-license-step-two/foreign-license-step-two.component';
import { ForeignLicenseStepThreeComponent } from './foreign-license-step-three/foreign-license-step-three.component';
import { ForeignLicenseStepFourComponent } from './foreign-license-step-four/foreign-license-step-four.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ForeignStepTwoTabOneComponent } from './foreign-step-two-tab-one/foreign-step-two-tab-one.component';
import { ForeignStepTwoTabTwoComponent } from './foreign-step-two-tab-two/foreign-step-two-tab-two.component';
import { ForeignStepTwoTabThreeComponent } from './foreign-step-two-tab-three/foreign-step-two-tab-three.component';
import { ForeignStepTwoTabFourComponent } from './foreign-step-two-tab-four/foreign-step-two-tab-four.component';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    SharedFormOthersModule,
    MatListModule,
    SharedFormEducationLevelModule,
    DynamicComponentDirective,
    StandardWorkingTeacherComponent,
    StandardWorkingNonTeacherComponent,
    FormUploadImageComponent,
    MatTabsModule,
    ForeignStepTwoTabOneComponent,
    ForeignStepTwoTabTwoComponent,
    ForeignStepTwoTabThreeComponent,
    ForeignStepTwoTabFourComponent,
    FileUploadComponent,

  ],
  declarations: [
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    FormVerifyOtpComponent,
    FormVerifyPhoneComponent,
    StandardWorkingComponent,
    SubstituteObjectiveComponent,
    SchoolManagerExperienceComponent,
    EducationManagerExperienceComponent,
    StudySupervisionExperienceComponent,
    ForeignLicenseStepOneComponent,
    ForeignLicenseStepTwoComponent,
    ForeignLicenseStepThreeComponent,
    ForeignLicenseStepFourComponent,
  ],
  exports: [
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    FormVerifyOtpComponent,
    FormVerifyPhoneComponent,
    StandardWorkingComponent,
    SubstituteObjectiveComponent,
    SchoolManagerExperienceComponent,
    EducationManagerExperienceComponent,
    StudySupervisionExperienceComponent,
    ForeignLicenseStepOneComponent,
    ForeignLicenseStepTwoComponent,
    ForeignLicenseStepThreeComponent,
    ForeignLicenseStepFourComponent,
  ],
})
export class SelfServiceFormModule {}
