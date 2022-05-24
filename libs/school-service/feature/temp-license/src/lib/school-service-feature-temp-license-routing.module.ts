import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { LicenseForeignComponent } from './license-foreign/license-foreign.component';
import { LicenseListComponent } from './license-list/license-list.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: LicenseListComponent,
      },
      {
        path: 'detail',
        component: LicenseDetailComponent,
      },
      {
        path: 'foreign',
        component: LicenseForeignComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolServiceFeatureTempLicenseRoutingModule {}
