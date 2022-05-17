import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniServiceLoginComponent } from '@ksp/uni-service/feature/login';
import {
  UniServiceRegisterCoordinatorComponent,
  UniServiceRegisterRequesterComponent,
} from '@ksp/uni-service/feature/register';

const routes: Routes = [
  { path: 'login', component: UniServiceLoginComponent },
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
  {
    path: 'request',
    loadChildren: () =>
      import('@ksp/uni-service/feature/req-degree-cert').then(
        (m) => m.UniServiceFeatureReqDegreeCertModule
      ),
  },
  { path: '**', component: UniServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
