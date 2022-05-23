import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TempLicenseComponent } from './temp-license/temp-license.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

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
        ],
      },

      {
        path: '**',
        redirectTo: 'temp-license',
        pathMatch: 'full',
      },
    ]),
  ],
  declarations: [TempLicenseComponent],
  exports: [TempLicenseComponent],
})
export class EServiceFeatureDigitalLicenseModule {}
