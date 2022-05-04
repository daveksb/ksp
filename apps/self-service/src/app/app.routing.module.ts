import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfServiceHomeComponent } from '@ksp/self-service/feature/home';
import {
  SelfServiceLicenseMainComponent,
  SelfServiceLicenseRequestComponent,
} from '@ksp/self-service/feature/license';
import { SelfServiceThaiLoginComponent } from '@ksp/self-service/feature/login';

const routes: Routes = [
  { path: 'home', component: SelfServiceHomeComponent },
  { path: 'login', component: SelfServiceThaiLoginComponent },
  {
    path: 'license',
    component: SelfServiceLicenseMainComponent,
    children: [
      {
        path: 'request',
        component: SelfServiceLicenseRequestComponent,
      },
    ],
  },
  { path: '**', component: SelfServiceHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
