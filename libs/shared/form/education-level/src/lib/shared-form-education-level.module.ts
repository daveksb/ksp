import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationLevelFormOneComponent } from './education-level-form-one/education-level-form-one.component';
import { EducationLevelFormTwoComponent } from './education-level-form-two/education-level-form-two.component';
import { EducationLevelFormThreeComponent } from './education-level-form-three/education-level-form-three.component';
import { EducationLevelFormFourComponent } from './education-level-form-four/education-level-form-four.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    EducationLevelFormOneComponent,
    EducationLevelFormTwoComponent,
    EducationLevelFormThreeComponent,
    EducationLevelFormFourComponent,
  ],
  exports: [
    EducationLevelFormOneComponent,
    EducationLevelFormTwoComponent,
    EducationLevelFormThreeComponent,
    EducationLevelFormFourComponent,
  ],
})
export class SharedFormEducationLevelModule {}
