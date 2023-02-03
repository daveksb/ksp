import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher/teacher.component';
import { AdvisorComponent } from './advisor/advisor.component';
import { NitetComponent } from './nitet/nitet.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseTypeAComponent } from './course/course-type-a.component';
import { CourseTypeBComponent } from './course/course-type-b.component';
import {
  HideInViewModeDirective,
  MinMaxDirective,
} from '@ksp/shared/directive';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { SharedFormTeacherInfoModule } from '@ksp/shared/form/teacher-info';
import { CourseConsiderComponent } from './course-consider/course-consider.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedFormTeacherInfoModule,
    AddRowButtonComponent,
    HideInViewModeDirective,
    MinMaxDirective
  ],
  declarations: [
    TeacherComponent,
    AdvisorComponent,
    NitetComponent,
    CourseTypeAComponent,
    CourseTypeBComponent,
    CourseConsiderComponent,
  ],
  exports: [
    TeacherComponent,
    AdvisorComponent,
    NitetComponent,
    CourseTypeAComponent,
    CourseTypeBComponent,
    CourseConsiderComponent,
  ],
})
export class SharedFormDegreeCertStepTwoModule {}
