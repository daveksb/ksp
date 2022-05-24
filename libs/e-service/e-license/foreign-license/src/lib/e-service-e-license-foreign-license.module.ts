import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { ForeignLicenseDetailComponent } from './foreign-license-detail/foreign-license-detail.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ForeignLicenseListComponent } from './foreign-license-list/foreign-license-list.component';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatDialogModule } from '@angular/material/dialog';

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
        component: ForeignLicenseListComponent,
      },
      {
        path: 'detail',
        component: ForeignLicenseDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedUiFormModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ForeignLicenseDetailComponent, ForeignLicenseListComponent],
  exports: [ForeignLicenseDetailComponent, ForeignLicenseListComponent],
})
export class EServiceELicenseForeignLicenseModule {}
