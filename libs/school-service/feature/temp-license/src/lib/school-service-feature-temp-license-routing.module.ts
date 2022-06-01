import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { LicenseListComponent } from './license-list/license-list.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: LicenseListComponent,
      },
      {
        path: 'detail',
        component: LicenseDetailComponent,
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
