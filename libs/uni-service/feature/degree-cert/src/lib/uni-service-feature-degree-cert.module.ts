import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  ReqDegreeCertHomeComponent,
  ReqDegreeCertStepFourComponent,
  ReqDegreeCertStepOneComponent,
  ReqDegreeCertStepThreeComponent,
  ReqDegreeCertStepTwoComponent,
} from '@ksp/shared-feature-degree-cert';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: ReqDegreeCertHomeComponent,
      },
      {
        path: 'step-1',
        component: ReqDegreeCertStepOneComponent,
      },
      {
        path: 'step-2',
        component: ReqDegreeCertStepTwoComponent,
      },
      {
        path: 'step-3',
        component: ReqDegreeCertStepThreeComponent,
      },
      {
        path: 'step-4',
        component: ReqDegreeCertStepFourComponent,
      },
      {
        path: '**',
        component: ReqDegreeCertHomeComponent,
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UniServiceFeatureDegreeCertModule {}
