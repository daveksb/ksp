import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TempLicenseComponent } from './temp-license/temp-license.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { TempLicenseForbiddenPropertyComponent } from './temp-license-forbidden-property/temp-license-forbidden-property.component';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';

export const eServiceFeatureDigitalLicenseRoutes: Route[] = [];

@NgModule({
  imports: [
    MatTabsModule,
    SharedUiFormModule,
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
            component: TempLicenseComponent,
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
    ]),
  ],
  declarations: [
    TempLicenseComponent,
    TempLicenseForbiddenPropertyComponent,
    TempLicenseListComponent,
  ],
  exports: [
    TempLicenseComponent,
    TempLicenseForbiddenPropertyComponent,
    TempLicenseListComponent,
  ],
})
export class EServiceFeatureDigitalLicenseModule {}
