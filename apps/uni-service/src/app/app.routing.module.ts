import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';

import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { ForeignIdComponent } from '@ksp/uni-service/feature/foreign-id';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  {
    path: 'home',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: '',
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
      import('@ksp/uni-service/feature/degree-cert').then(
        (m) => m.UniServiceFeatureDegreeCertModule
      ),
  },
  {
    path: 'student-list',
    data: {
      type: UniserviceImportType.studentList,
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/graduate-list').then(
        (m) => m.UniServiceFeatureGraduateListModule
      ),
  },
  {
    path: 'graduate-list',
    data: {
      type: UniserviceImportType.graduateList,
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/graduate-list').then(
        (m) => m.UniServiceFeatureGraduateListModule
      ),
  },
  {
    path: 'foreign-id',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: '',
        component: ForeignIdComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
