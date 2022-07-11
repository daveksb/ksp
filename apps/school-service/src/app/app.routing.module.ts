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
    path: 'retired-user',
    loadChildren: () =>
      import('@ksp/school-service/feature/retired').then(
        (m) => m.SchoolServiceFeatureRetiredModule
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
    path: 'foreign-teacher',
    loadChildren: () =>
      import('@ksp/school-service/feature/foreign-teacher').then(
        (m) => m.SchoolServiceFeatureForeignTeacherModule
      ),
  },
  {
    path: 'qualification-approve',
    loadChildren: () =>
      import('@ksp/school-service/feature/qualification-approve').then(
        (m) => m.SchoolServiceFeatureQualificationApproveModule
      ),
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('@ksp/school-service/feature/activity').then(
        (m) => m.SchoolServiceFeatureActivityModule
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
    path: 'request-reward',
    loadChildren: () =>
      import('@ksp/school-service/feature/request-reward').then(
        (m) => m.SchoolServiceFeatureRequestRewardModule
      ),
  },

  { path: '**', component: SchoolServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
