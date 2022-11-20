import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLicenseIdDetailComponent } from './create-license-id-detail/create-license-id-detail.component';
import { CreateLicenseIdListComponent } from './create-license-id-list/create-license-id-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { FormUploadImageComponent } from '@ksp/self-service/form';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CreateLicenseIdListComponent,
      },
      {
        path: 'detail',
        component: CreateLicenseIdDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDatepickerModule,
    TopNavComponent,
    MatPaginatorModule,
    SharedFormOthersModule,
    FormUploadImageComponent,
    BottomNavComponent,
    ThaiDatePipe,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [CreateLicenseIdDetailComponent, CreateLicenseIdListComponent],
  exports: [CreateLicenseIdDetailComponent, CreateLicenseIdListComponent],
})
export class EServiceELicenseCreateLicenseIdModule {}
