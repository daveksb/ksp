import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolServiceLoginComponent } from '@ksp/school-service/feature/login';

const routes: Routes = [
  { path: 'login', component: SchoolServiceLoginComponent },
  {
    path: 'register',
    loadChildren: () =>
      import('@ksp/school-service/feature/register').then(
        (m) => m.SchoolServiceFeatureRegisterModule
      ),
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('@ksp/school-service/feature/forget-password').then(
        (m) => m.SchoolServiceFeatureForgetPasswordModule
      ),
  },
  {
    path: 'temp-license',
    loadChildren: () =>
      import('@ksp/school-service/feature/temp-license').then(
        (m) => m.SchoolServiceFeatureTempLicenseModule
      ),
  },
  {
    path: 'foreign-id',
    loadChildren: () =>
      import('@ksp/school-service/feature/foreign-id').then(
        (m) => m.SchoolServiceFeatureForeignIdModule
      ),
  },
  {
    path: 'staff-management',
    loadChildren: () =>
      import('@ksp/school-service/feature/staff-management').then(
        (m) => m.SchoolServiceFeatureStaffManagementModule
      ),
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('@ksp/school-service/feature/activity').then(
        (m) => m.SchoolServiceFeatureActivityModule
      ),
  },

  { path: '**', component: SchoolServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
