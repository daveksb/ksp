import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher/teacher.component';
import { AdvisorComponent } from './advisor/advisor.component';
import { NitetComponent } from './nitet/nitet.component';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormTeacherInfoModule } from '@ksp/shared/form/teacher-info';
import { CourseTypeAComponent } from './couse/course-type-a.component';
import { CourseTypeBComponent } from './couse/course-type-b.component';
import { HideInViewModeDirective } from '@ksp/shared/directive';

@NgModule({
  imports: [
    CommonModule,
    SharedUiAddRowButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedFormTeacherInfoModule,
    HideInViewModeDirective,
  ],
  declarations: [
    TeacherComponent,
    AdvisorComponent,
    NitetComponent,
    CourseTypeAComponent,
    CourseTypeBComponent,
  ],
  exports: [
    TeacherComponent,
    AdvisorComponent,
    NitetComponent,
    CourseTypeAComponent,
    CourseTypeBComponent,
  ],
})
export class SharedFormDegreeCertStepTwoModule {}
