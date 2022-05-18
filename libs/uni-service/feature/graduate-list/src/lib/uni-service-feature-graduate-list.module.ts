import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UniServiceFeatureGraduateListRoutingModule } from './uni-service-feature-graduate-list-routing.module';
import { ImportStudentListComponent } from './import-student-list/import-student-list.component';

@NgModule({
  imports: [CommonModule, UniServiceFeatureGraduateListRoutingModule],
  declarations: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentListComponent,
  ],
  exports: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentListComponent,
  ],
})
export class UniServiceFeatureGraduateListModule {}
