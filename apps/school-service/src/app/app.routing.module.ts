import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolServiceLoginComponent } from '@ksp/school-service/feature/login';
import { SchoolServiceFeatureRegisterModule } from '@ksp/school-service/feature/register';

const routes: Routes = [
  { path: 'login', component: SchoolServiceLoginComponent },
  {
    path: 'temp-license',
    loadChildren: () =>
      import('@ksp/school-service/feature/temp-license').then(
        (m) => m.SchoolServiceFeatureTempLicenseModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@ksp/school-service/feature/register').then(
        (m) => m.SchoolServiceFeatureRegisterModule
      ),
  },
  { path: '**', component: SchoolServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
