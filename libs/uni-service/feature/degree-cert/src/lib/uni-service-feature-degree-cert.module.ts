import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  DegreeCertHomeComponent,
  DegreeCertStepFourComponent,
  DegreeCertStepOneComponent,
  DegreeCertStepThreeComponent,
  DegreeCertStepTwoComponent,
} from '@ksp/shared-feature-degree-cert';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: DegreeCertHomeComponent,
      },
      {
        path: 'step-1',
        component: DegreeCertStepOneComponent,
      },
      {
        path: 'step-2',
        component: DegreeCertStepTwoComponent,
      },
      {
        path: 'step-3',
        component: DegreeCertStepThreeComponent,
      },
      {
        path: 'step-4',
        component: DegreeCertStepFourComponent,
      },
      {
        path: '**',
        component: DegreeCertHomeComponent,
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UniServiceFeatureDegreeCertModule {}
