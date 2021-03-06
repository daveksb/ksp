import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';

import { ForeignStudentIdComponent } from '@ksp/uni-service/feature/foreign-student-id';
import {
  UniContainerPageComponent,
  UniHomeComponent,
  UniLoginComponent,
} from '@ksp/uni-service/pages';

const routes: Routes = [
  { path: 'login', component: UniLoginComponent },
  {
    path: 'home',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        component: UniHomeComponent,
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
    loadChildren: () =>
      import('@ksp/uni-service/feature/graduate').then(
        (m) => m.UniServiceFeatureGraduateModule
      ),
  },
  {
    path: 'foreign-student-id',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        component: ForeignStudentIdComponent,
      },
    ],
  },
  {
    path: 'edit-degree-cert',
    data: {
      type: UniserviceImportType.graduateList,
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/edit-degree-cert').then(
        (m) => m.UniServiceFeatureEditDegreeCertModule
      ),
  },
  {
    path: 'edit-student-list',
    data: {
      type: UniserviceImportType.graduateList,
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/edit-student-list').then(
        (m) => m.UniServiceFeatureEditStudentListModule
      ),
  },
  {
    path: 'test-data-result',
    data: {
      type: UniserviceImportType.graduateList,
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/test-data-result').then(
        (m) => m.UniServiceFeatureTestDataResultModule
      ),
  },
  {
    path: 'performance-data-result',
    data: {
      type: UniserviceImportType.graduateList,
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/test-performance-result').then(
        (m) => m.UniServiceFeatureTestPerformanceResultModule
      ),
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
