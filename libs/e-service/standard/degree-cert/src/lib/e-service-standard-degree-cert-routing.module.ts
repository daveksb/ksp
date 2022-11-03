import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ApproveComponent } from './approve/approve.component';
import { CheckComponent } from './check/check.component';
import { ConsiderComponent } from './consider/consider.component';
import { FinalResultComponent } from './final-result/final-result.component';
import { EServiceDegreeCertListComponent } from './list/e-service-degree-cert-list.component';
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
        component: EServiceDegreeCertListComponent,
      },
      {
        path: 'list/:type',
        component: EServiceDegreeCertListComponent,
      },
      {
        path: 'list/:type/:processId',
        component: EServiceDegreeCertListComponent,
      },
      {
        path: 'check/:key', //ตรวจสอบ
        component: CheckComponent,
      },
      {
        path: 'verify/:type',
        component: VerifyComponent,
      },
      {
        path: 'verify/:type/:process/:requestId',
        component: VerifyComponent,
      },
      {
        path: 'consider/:key', //พิจารณา
        component: ConsiderComponent,
      },
      {
        path: 'approve/:key', //ยืนยัน
        component: ApproveComponent,
      },
      {
        path: 'final-result/:key', //ขั้นตอนสุดท้าย
        component: FinalResultComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EServiceStandardDegreeCertRoutingModule {}
