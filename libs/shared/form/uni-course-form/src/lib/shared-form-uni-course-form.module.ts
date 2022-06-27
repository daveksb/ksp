import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormOneComponent } from './course-form-one/course-form-one.component';
import { CourseFormTwoComponent } from './course-form-two/course-form-two.component';
import { CourseFormThreeComponent } from './course-form-three/course-form-three.component';
import { CourseFormFourComponent } from './course-form-four/course-form-four.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    CourseFormOneComponent,
    CourseFormTwoComponent,
    CourseFormThreeComponent,
    CourseFormFourComponent,
  ],
  exports: [
    CourseFormOneComponent,
    CourseFormTwoComponent,
    CourseFormThreeComponent,
    CourseFormFourComponent,
  ],
})
export class SharedFormUniCourseFormModule {}
