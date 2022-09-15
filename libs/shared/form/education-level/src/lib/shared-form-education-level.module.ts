import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationLevelFormOneComponent } from './education-level-form-one/education-level-form-one.component';
import { EducationLevelFormTwoComponent } from './education-level-form-two/education-level-form-two.component';
import { EducationLevelFormThreeComponent } from './education-level-form-three/education-level-form-three.component';
import { EducationLevelFormFourComponent } from './education-level-form-four/education-level-form-four.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EducationLevelFormFiveComponent } from './education-level-form-five/education-level-form-five.component';
import { EducationLevelFormSixComponent } from './education-level-form-six/education-level-form-six.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    EducationLevelFormOneComponent,
    EducationLevelFormTwoComponent,
    EducationLevelFormThreeComponent,
    EducationLevelFormFourComponent,
    ExperienceFormComponent,
    EducationLevelFormFiveComponent,
    EducationLevelFormSixComponent,
  ],
  exports: [
    EducationLevelFormOneComponent,
    EducationLevelFormTwoComponent,
    EducationLevelFormThreeComponent,
    EducationLevelFormFourComponent,
    ExperienceFormComponent,
    EducationLevelFormFiveComponent,
    EducationLevelFormSixComponent,
  ],
})
export class SharedFormEducationLevelModule {}
