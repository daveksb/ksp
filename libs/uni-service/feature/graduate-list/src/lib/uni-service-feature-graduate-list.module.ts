import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqListOfStudentsComponent } from './req-list-of-students/req-list-of-students.component';
import { CourseSearchComponent } from './course-search/course-search.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ReqListOfStudentsComponent, CourseSearchComponent],
  exports: [ReqListOfStudentsComponent, CourseSearchComponent],
})
export class UniServiceFeatureGraduateListModule {}
