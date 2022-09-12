import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolServiceLoginComponent } from '@ksp/school-service/feature/login';
import { AuthGuard } from './auth.guard';

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
      import('@ksp/school-service/feature/request').then(
        (m) => m.SchoolTempLicenseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'foreign-teacher',
    loadChildren: () =>
      import('@ksp/school-service/feature/foreign-teacher').then(
        (m) => m.SchoolServiceFeatureForeignTeacherModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'qualification-approve',
    loadChildren: () =>
      import('@ksp/school-service/feature/qualification-approve').then(
        (m) => m.SchoolServiceFeatureQualificationApproveModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('@ksp/school-service/feature/activity').then(
        (m) => m.SchoolServiceFeatureActivityModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'staff-management',
    loadChildren: () =>
      import('@ksp/school-service/feature/staff-management').then(
        (m) => m.SchoolServiceFeatureStaffManagementModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'request-reward',
    loadChildren: () =>
      import('@ksp/school-service/feature/request-reward').then(
        (m) => m.SchoolServiceFeatureRequestRewardModule
      ),
    canActivate: [AuthGuard],
  },

  { path: '**', component: SchoolServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
