import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ApproveComponent } from './approve/approve.component';
import { ConsiderComponent } from './consider/consider.component';
import { DegreeCertListComponent } from './degree-cert-list/degree-cert-list.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepTwoComponent } from './step-two/step-two.component';
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
        path: 'list/:type',
        component: DegreeCertListComponent,
      },
      {
        path: 'step-1',
        component: StepOneComponent,
      },
      {
        path: 'step-2',
        component: StepTwoComponent,
      },
      {
        path: 'step-3',
        component: StepThreeComponent,
      },
      {
        path: 'step-4',
        component: StepFourComponent,
      },
      {
        path: 'step-5',
        component: StepFiveComponent,
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
