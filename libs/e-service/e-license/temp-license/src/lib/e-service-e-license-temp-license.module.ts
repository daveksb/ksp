import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { TempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';

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
        component: TempLicenseListComponent,
      },
      {
        path: 'detail',
        component: TempLicenseDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    SharedUiFormModule,
    EServiceUiLicenseCheckModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TempLicenseListComponent, TempLicenseDetailComponent],
  exports: [TempLicenseListComponent, TempLicenseDetailComponent],
})
export class EServiceELicenseTempLicenseModule {}
