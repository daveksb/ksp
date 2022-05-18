import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReqDegreeCertHomeComponent } from './req-degree-cert-home/req-degree-cert-home.component';
import { ReqDegreeCertStepFourComponent } from './req-degree-cert-step-four/req-degree-cert-step-four.component';
import { ReqDegreeCertStepOneComponent } from './req-degree-cert-step-one/req-degree-cert-step-one.component';
import { ReqDegreeCertStepThreeComponent } from './req-degree-cert-step-three/req-degree-cert-step-three.component';
import { ReqDegreeCertStepTwoComponent } from './req-degree-cert-step-two/req-degree-cert-step-two.component';
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureDegreeCertRoutingModule {}
