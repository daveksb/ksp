import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { PageNotFoundComponent } from '@ksp/shared/ui';
import { SchoolRequestListComponent } from './request-list/request-list.component';
import { SchoolRequestComponent } from './school-request/school-request.component';

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
        component: SchoolRequestListComponent,
      },
      {
        path: 'request',
        component: SchoolRequestComponent,
      },
      {
        path: 'request/:id',
        component: SchoolRequestComponent,
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
export class SchoolTempLicenseRoutingModule {}
