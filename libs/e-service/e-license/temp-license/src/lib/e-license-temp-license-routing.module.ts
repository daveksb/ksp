import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { TempLicenseApproveComponent } from './temp-license-approve/temp-license-approve.component';
import { TempLicenseCheckConfirmComponent } from './temp-license-check-confirm/temp-license-check-confirm.component';
import { TempLicenseCheckForbiddenComponent } from './temp-license-check-forbidden/temp-license-check-forbidden.component';
import { TempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { ETempLicenseListComponent } from './e-temp-license-list/e-temp-license-list.component';

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
        path: 'detail',
        component: TempLicenseDetailComponent,
      },
      {
        path: 'forbidden',
        component: TempLicenseCheckForbiddenComponent,
      },
      {
        path: 'confirm',
        component: TempLicenseCheckConfirmComponent,
      },
      {
        path: 'approve',
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
