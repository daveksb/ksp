import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStudentListComponent } from './edit-student-list/edit-student-list.component';
import { EditStudentDetailComponent } from './edit-student-detail/edit-student-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { MatTableModule } from '@angular/material/table';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { EditLicenseComponent } from '@ksp/shared/form/license';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  declarations: [EditStudentListComponent, EditStudentDetailComponent],
  exports: [EditStudentListComponent, EditStudentDetailComponent],
})
export class UniServiceFeatureEditStudentListModule {}
