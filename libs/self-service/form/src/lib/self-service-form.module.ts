import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadImageComponent } from './form-upload-image/form-upload-image.component';
import { FormUserEducationComponent } from './form-user-education/form-user-education.component';
import { FormUserExperienceComponent } from './form-user-experience/form-user-experience.component';
import { FormUserPerformanceComponent } from './form-user-performance/form-user-performance.component';
import { FormUserWorkplaceComponent } from './form-user-workplace/form-user-workplace.component';
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
import {
  FileMultiUploadComponent,
  FileUploadComponent,
} from '@ksp/shared/form/file-upload';
import { TransferKnowledgeInfoComponent } from './transfer-knowledge-info/transfer-knowledge-info.component';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { TransferKnowledgeEducationComponent } from './transfer-knowledge-education/transfer-knowledge-education.component';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { CompareKnowledgeEducationComponent } from './compare-knowledge-education/compare-knowledge-education.component';
import { CompareKnowledgeInfoComponent } from './compare-knowledge-info/compare-knowledge-info.component';
import { RenewLicensePropertyComponent } from './renew-license-property/renew-license-property.component';
import { SharedFormSelfRenewLicensePropertyFormModule } from '@ksp/shared/form/self-renew-license-property-form';
import { RenewLicensePropertySupervisionComponent } from './renew-license-property-supervision/renew-license-property-supervision.component';
import { RenewLicensePropertyManagerComponent } from './renew-license-property-manager/renew-license-property-manager.component';
import { RenewLicenseForeignStepTwoComponent } from './renew-license-foreign-step-two/renew-license-foreign-step-two.component';
import { RenewLicenseForeignTeacherComponent } from './renew-license-foreign-teacher/renew-license-foreign-teacher.component';
import { RenewLicenseForeignNonTeacherComponent } from './renew-license-foreign-non-teacher/renew-license-foreign-non-teacher.component';
import { TestResultTableComponent } from '@ksp/self-service/ui';
import { FormUserTrainingWorkplaceComponent } from './form-user-training-workplace/form-user-training-workplace.component';
import { ForeignStepTwoTabFourRenewComponent } from './foreign-step-two-tab-four-renew/foreign-step-two-tab-four-renew.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TransferKnowledgeCareerCertComponent } from './transfer-knowledge-career-cert/transfer-knowledge-career-cert.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
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
    AddRowButtonComponent,
    SchoolServiceFormActivityModule,
    SharedFormSelfRenewLicensePropertyFormModule,
    TestResultTableComponent,
    MatDatepickerModule,
    SharedFormOthersModule,
    FileMultiUploadComponent,
  ],
  declarations: [
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    StandardWorkingComponent,
    SubstituteObjectiveComponent,
    SchoolManagerExperienceComponent,
    EducationManagerExperienceComponent,
    StudySupervisionExperienceComponent,
    ForeignLicenseStepOneComponent,
    ForeignLicenseStepTwoComponent,
    ForeignLicenseStepThreeComponent,
    ForeignLicenseStepFourComponent,
    TransferKnowledgeInfoComponent,
    TransferKnowledgeEducationComponent,
    CompareKnowledgeEducationComponent,
    CompareKnowledgeInfoComponent,
    RenewLicensePropertyComponent,
    RenewLicensePropertySupervisionComponent,
    RenewLicensePropertyManagerComponent,
    RenewLicenseForeignStepTwoComponent,
    RenewLicenseForeignTeacherComponent,
    RenewLicenseForeignNonTeacherComponent,
    FormUserTrainingWorkplaceComponent,
    ForeignStepTwoTabFourRenewComponent,
    TransferKnowledgeCareerCertComponent,
  ],
  exports: [
    FormUserEducationComponent,
    FormUserExperienceComponent,
    FormUserPerformanceComponent,
    FormUserWorkplaceComponent,
    StandardWorkingComponent,
    SubstituteObjectiveComponent,
    SchoolManagerExperienceComponent,
    EducationManagerExperienceComponent,
    StudySupervisionExperienceComponent,
    ForeignLicenseStepOneComponent,
    ForeignLicenseStepTwoComponent,
    ForeignLicenseStepThreeComponent,
    ForeignLicenseStepFourComponent,
    TransferKnowledgeInfoComponent,
    TransferKnowledgeEducationComponent,
    CompareKnowledgeEducationComponent,
    CompareKnowledgeInfoComponent,
    RenewLicensePropertyComponent,
    RenewLicensePropertySupervisionComponent,
    RenewLicensePropertyManagerComponent,
    RenewLicenseForeignStepTwoComponent,
    RenewLicenseForeignTeacherComponent,
    RenewLicenseForeignNonTeacherComponent,
    FormUserTrainingWorkplaceComponent,
    ForeignStepTwoTabFourRenewComponent,
    TransferKnowledgeCareerCertComponent,
  ],
})
export class SelfServiceFormModule {}
