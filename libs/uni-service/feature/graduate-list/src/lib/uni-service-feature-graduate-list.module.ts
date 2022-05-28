import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UniServiceFeatureGraduateListRoutingModule } from './uni-service-feature-graduate-list-routing.module';
import { ImportStudentComponent } from './import-student/import-student.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureGraduateListRoutingModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    TableModule,
  ],
  declarations: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentComponent,
  ],
  exports: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentComponent,
  ],
})
export class UniServiceFeatureGraduateListModule {}
