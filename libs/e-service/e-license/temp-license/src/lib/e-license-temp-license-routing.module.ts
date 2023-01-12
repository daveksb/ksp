import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { TempLicenseApproveComponent } from './temp-license-approve/temp-license-approve.component';
import { TempLicenseCheckConfirmComponent } from './temp-license-check-confirm/temp-license-check-confirm.component';
import { TempLicenseCheckForbiddenComponent } from './temp-license-check-forbidden/temp-license-check-forbidden.component';
import { ETempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { TempLicenseApproveListComponent } from './temp-license-approve-list/temp-license-approve-list.component';
import { ETempLicenseListComponent } from './temp-license-list/temp-license-list.component';

const routes: Routes = [
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
        component: ETempLicenseListComponent,
      },
      {
        path: 'list/:careertype',
        component: ETempLicenseListComponent,
      },
      {
        path: 'detail',
        component: ETempLicenseDetailComponent,
      },
      {
        path: 'detail/:id',
        component: ETempLicenseDetailComponent,
      },
      {
        path: 'forbidden',
        component: TempLicenseCheckForbiddenComponent,
      },
      {
        path: 'confirm/:id',
        component: TempLicenseCheckConfirmComponent,
      },
      {
        path: 'approve-list',
        component: TempLicenseApproveListComponent,
      },
      {
        path: 'consider-list/:careertype',
        component: TempLicenseApproveListComponent,
      },
      {
        path: 'consider-detail/:id',
        component: TempLicenseApproveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ELicenseTempLicenseRoutingModule {}
