import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { PageNotFoundComponent } from '@ksp/shared/ui';
import { SchoolTempLicenseDetailComponent } from './school-temp-license-detail/school-temp-license-detail.component';
import { SchoolTempLicenseListComponent } from './school-temp-license-list/school-temp-license-list.component';

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
        component: SchoolTempLicenseListComponent,
      },
      {
        path: 'detail',
        component: SchoolTempLicenseDetailComponent,
      },
      {
        path: 'detail/:id',
        component: SchoolTempLicenseDetailComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolServiceFeatureTempLicenseRoutingModule {}
