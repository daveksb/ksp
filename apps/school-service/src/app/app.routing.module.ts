import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { SchoolServiceLoginComponent } from '@ksp/school-service/feature/login';
import { ReqTempLicenseHomeComponent } from '@ksp/school-service/feature/req-temp-license';

const routes: Routes = [
  { path: 'login', component: SchoolServiceLoginComponent },
  {
    path: 'request',
    component: SchoolServiceContainerPageComponent,
    children: [
      {
        path: 'home',
        component: ReqTempLicenseHomeComponent,
      },
    ],
  },
  { path: '**', component: SchoolServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
