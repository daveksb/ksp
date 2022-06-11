import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher/teacher.component';
import { AdvisorComponent } from './advisor/advisor.component';
import { NitetComponent } from './nitet/nitet.component';
import { CourseTypeTwoComponent } from './couse/course-type-two.component';
import { CourseTypeOneComponent } from './couse/course-type-one.component';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormAdvisorPersonInfoModule } from '@ksp/shared/form/advisor-person-info';

@NgModule({
  imports: [
    CommonModule,
    SharedUiAddRowButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedFormAdvisorPersonInfoModule,
  ],
  declarations: [
    TeacherComponent,
    AdvisorComponent,
    NitetComponent,
    CourseTypeTwoComponent,
    CourseTypeOneComponent,
  ],
  exports: [
    TeacherComponent,
    AdvisorComponent,
    NitetComponent,
    CourseTypeTwoComponent,
    CourseTypeOneComponent,
  ],
})
export class SharedFormDegreeCertStepTwoModule {}
