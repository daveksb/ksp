import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { ForeignIdComponent } from '@ksp/uni-service/feature/foreign-id';
import { UniServiceHomeComponent } from '@ksp/uni-service/feature/home';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
  {
    path: 'home',
    data: { header: 'หน้าแรก' },
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
    data: {
      header: 'ยื่นใบคำขอ',
      subHeader: 'ขอรับรองปริญญาและประกาศนียบัตร',
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/degree-cert').then(
        (m) => m.UniServiceFeatureDegreeCertModule
      ),
  },
  {
    path: 'graduate-list',
    data: {
      header: 'ยื่นใบคำขอ',
      subHeader: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
    },
    loadChildren: () =>
      import('@ksp/uni-service/feature/graduate-list').then(
        (m) => m.UniServiceFeatureGraduateListModule
      ),
  },
  {
    path: 'foreign-id',
    data: {
      header: 'ยื่นใบคำขอ',
      subHeader: 'ขอสร้างเลขคุรุสภาสำหรับนักศึกษาชาวต่างชาติ',
    },
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
