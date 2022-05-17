import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';
import { ReqForeignIdComponent } from '@ksp/uni-service/feature/req-foreign-id';
import { ReqListOfStudentsComponent } from '@ksp/uni-service/feature/req-list-of-students';

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
    path: 'register',
    loadChildren: () =>
      import('@ksp/uni-service/feature/register').then(
        (m) => m.UniServiceFeatureRegisterModule
      ),
  },
  {
    path: 'retired',
    loadChildren: () =>
      import('@ksp/uni-service/feature/retired').then(
        (m) => m.UniServiceFeatureRetiredModule
      ),
  },
  {
    path: 'degree-cert',
    loadChildren: () =>
      import('@ksp/uni-service/feature/req-degree-cert').then(
        (m) => m.UniServiceFeatureReqDegreeCertModule
      ),
  },
  {
    path: 'foreign-id',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: '**',
        component: ReqForeignIdComponent,
      },
    ],
  },
  {
    path: 'student-list',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: '**',
        component: ReqListOfStudentsComponent,
      },
    ],
  },

  { path: '**', component: UniServiceHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
