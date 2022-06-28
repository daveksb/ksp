import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UniServiceFeatureGraduateListRoutingModule } from './uni-service-feature-graduate-list-routing.module';
import { ImportStudentComponent } from './import-student/import-student.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SharedFeatureDegreeCertModule } from '@ksp/shared/feature/degree-cert';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { DegreeSearchFormComponent } from '@ksp/shared/form/search';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureGraduateListRoutingModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    TableModule,
    SharedFormOthersModule,
    MatSelectModule,
    MatOptionModule,
    BottomNavComponent,
    SharedFeatureDegreeCertModule,
    MatIconModule,
    MatTableModule,
    RequestHeaderInfoComponent,
    TopNavComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    DegreeSearchFormComponent,
  ],
  declarations: [
    CourseSearchComponent,
    CourseDetailComponent,
    ImportStudentComponent,
  ],
})
export class UniServiceFeatureGraduateListModule {}
