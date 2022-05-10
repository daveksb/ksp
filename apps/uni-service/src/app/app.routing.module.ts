import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';
import { UniServiceRegisterComponent } from '@ksp/uni-service/feature/register';
import {
  ReqDegreeCertHomeComponent,
  ReqDegreeCertStepOneComponent,
  ReqDegreeCertStepThreeComponent,
  ReqDegreeCertStepTwoComponent,
} from '@ksp/uni-service/feature/req-degree-cert';
import { ReqForeignIdComponent } from '@ksp/uni-service/feature/req-foreign-id';
import { ReqListOfGraduatesComponent } from '@ksp/uni-service/feature/req-list-of-graduates';
import { ReqListOfStudentsComponent } from '@ksp/uni-service/feature/req-list-of-students';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  { path: 'register', component: UniServiceRegisterComponent },
  { path: 'search-uni', component: UniversitySearchComponent }, // temp
  {
    path: 'request',
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
  { path: '**', component: UniServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
