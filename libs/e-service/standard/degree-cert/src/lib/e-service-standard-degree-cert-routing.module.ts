import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ApproveComponent } from './approve/approve.component';
import { CheckComponent } from './check/check.component';
import { ConsiderComponent } from './consider/consider.component';
import { DegreeCertListComponent } from './degree-cert-list/degree-cert-list.component';
import { VerifyComponent } from './verify/verify.component';

export const routes: Routes = [
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
        component: DegreeCertListComponent,
      },
      {
        path: 'list/:type',
        component: DegreeCertListComponent,
      },
      {
        path: 'check',
        component: CheckComponent,
      },
      {
        path: 'verify/:type',
        component: VerifyComponent,
      },
      {
        path: 'consider',
        component: ConsiderComponent,
      },
      {
        path: 'approve',
        component: ApproveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EServiceStandardDegreeCertRoutingModule {}
