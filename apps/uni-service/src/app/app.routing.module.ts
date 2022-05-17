import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';
import {
  UniServiceRegisterCoordinatorComponent,
  UniServiceRegisterRequesterComponent,
} from '@ksp/uni-service/feature/register';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  {
    path: 'home',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: '**',
        component: UniServiceHomeComponent,
      },
    ],
  },
  {
    path: 'register-requester',
    component: UniServiceRegisterRequesterComponent,
  },
  {
    path: 'register-coordinator',
    component: UniServiceRegisterCoordinatorComponent,
  },
  {
    path: 'retired',
    loadChildren: () =>
      import('@ksp/uni-service/feature/retired').then(
        (m) => m.UniServiceFeatureRetiredModule
      ),
  },
  /* {
    path: 'request',
    loadChildren: () =>
      import('@ksp/uni-service/feature/req-degree-cert').then(
        (m) => m.UniServiceFeatureReqDegreeCertModule
      ),
  }, */
  {
    path: 'request-degree-cert',
    loadChildren: () =>
      import('@ksp/uni-service/feature/req-degree-cert').then(
        (m) => m.UniServiceFeatureReqDegreeCertModule
      ),
  },
  /*       {
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
      }, */
  { path: '**', component: UniServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
