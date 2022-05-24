import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TempLicenseComponent } from './temp-license/temp-license.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';

export const eServiceFeatureDigitalLicenseRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EServiceContainerPageComponent,
        children: [
          {
            path: 'temp-license',
            component: TempLicenseComponent,
          },
          {
            path: '**',
            component: TempLicenseListComponent,
          },
        ],
      },
      {
        path: '**',
        component: TempLicenseListComponent,
      },
    ]),
  ],
  declarations: [TempLicenseComponent, TempLicenseListComponent],
  exports: [TempLicenseComponent, TempLicenseListComponent],
})
export class EServiceFeatureDigitalLicenseModule {}
