import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReqDegreeCertHomeComponent } from './req-degree-cert-home/req-degree-cert-home.component';
import { ReqDegreeCertStepFourComponent } from './req-degree-cert-step-four/req-degree-cert-step-four.component';
import { ReqDegreeCertStepOneComponent } from './req-degree-cert-step-one/req-degree-cert-step-one.component';
import { ReqDegreeCertStepThreeComponent } from './req-degree-cert-step-three/req-degree-cert-step-three.component';
import { ReqDegreeCertStepTwoComponent } from './req-degree-cert-step-two/req-degree-cert-step-two.component';
import { ReqForeignIdComponent } from '@ksp/uni-service/feature/req-foreign-id';
import { ReqListOfGraduatesComponent } from '@ksp/uni-service/feature/req-list-of-graduates';
import { ReqListOfStudentsComponent } from '@ksp/uni-service/feature/req-list-of-students';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'home',
        component: UniServiceHomeComponent,
      },
      {
        path: 'degree-cert',
        component: ReqDegreeCertHomeComponent,
      },
      {
        path: 'degree-cert-1',
        component: ReqDegreeCertStepOneComponent,
      },
      {
        path: 'degree-cert-2',
        component: ReqDegreeCertStepTwoComponent,
      },
      {
        path: 'degree-cert-3',
        component: ReqDegreeCertStepThreeComponent,
      },
      {
        path: 'degree-cert-4',
        component: ReqDegreeCertStepFourComponent,
      },
      {
        path: 'foreign-id',
        component: ReqForeignIdComponent,
      },
      {
        path: 'list-of-students',
        component: ReqListOfStudentsComponent,
      },
      {
        path: 'list-of-graduates',
        component: ReqListOfGraduatesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureReqDegreeCertRoutingModule {}
