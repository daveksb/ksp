import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStudentListComponent } from './edit-student-list/edit-student-list.component';
import { EditStudentDetailComponent } from './edit-student-detail/edit-student-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { MatTableModule } from '@angular/material/table';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { EditLicenseComponent } from '@ksp/shared/form/license';
import { FormAddressTableComponent, SharedFormOthersModule } from '@ksp/shared/form/others';
import { RequestHeaderInfoComponent, UniFormBadgeComponent } from '@ksp/shared/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SharedDegreeCertModule } from '@ksp/shared/degree-cert';
import { DegreeSearchComponent } from '@ksp/shared/search';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: EditStudentListComponent,
      },
      {
        path: 'detail',
        component: EditStudentDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    TopNavComponent,
    EditLicenseComponent,
    SharedFormOthersModule,
    RequestHeaderInfoComponent,
    BottomNavComponent,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    TableModule,
    FormAddressTableComponent,
    FormsModule,
    UniFormBadgeComponent,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    SharedDegreeCertModule,
    DegreeSearchComponent,
    DropdownModule
  ],
  declarations: [EditStudentListComponent, EditStudentDetailComponent],
  exports: [EditStudentListComponent, EditStudentDetailComponent],
})
export class UniServiceFeatureEditStudentListModule {}
