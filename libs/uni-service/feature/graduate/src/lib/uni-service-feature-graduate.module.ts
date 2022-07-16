import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeListComponent } from './degree-list/degree-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UniServiceFeatureGraduateRoutingModule } from './uni-service-feature-graduate-list-routing.module';
import { ImportStudentComponent } from './import-student/import-student.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import {
  FormAddressTableComponent,
  SharedFormOthersModule,
} from '@ksp/shared/form/others';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SharedDegreeCertModule } from '@ksp/shared/degree-cert';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { DegreeSearchComponent } from '@ksp/shared/search';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureGraduateRoutingModule,
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
    SharedDegreeCertModule,
    MatIconModule,
    MatTableModule,
    RequestHeaderInfoComponent,
    TopNavComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    DegreeSearchComponent,
    AddRowButtonComponent,
    DropdownModule,
    FormAddressTableComponent,
  ],
  declarations: [
    DegreeListComponent,
    CourseDetailComponent,
    ImportStudentComponent,
  ],
})
export class UniServiceFeatureGraduateModule {}
