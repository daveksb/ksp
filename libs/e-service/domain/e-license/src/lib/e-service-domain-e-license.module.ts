import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import {
  TempLicenseDetailComponent,
  TempLicenseListComponent,
} from '@ksp/e-service/feature/temp-license';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'temp-license',
        component: TempLicenseDetailComponent,
      },
      {
        path: 'temp-license-list',
        component: TempLicenseListComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'temp-license',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EServiceDomainELicenseModule {}
