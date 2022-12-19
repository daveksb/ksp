import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempLicenseRegisterListComponent } from './temp-license-register-list/temp-license-register-list.component';
import { RequestSearchComponent } from '@ksp/shared/search';
import { MatTableModule } from '@angular/material/table';
import { TopNavComponent } from '@ksp/shared/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';

const routes: Routes = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: TempLicenseRegisterListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RequestSearchComponent,
    MatTableModule,
    TopNavComponent,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatPaginatorModule,
    ThaiDatePipe
  ],
  declarations: [TempLicenseRegisterListComponent],
  exports: [TempLicenseRegisterListComponent],
})
export class SchoolServiceFeatureTempLicenseRegisterModule {}
