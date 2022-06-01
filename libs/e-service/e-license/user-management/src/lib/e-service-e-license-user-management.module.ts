import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { MatDialogModule } from '@angular/material/dialog';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'detail',
        component: UserDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiFormModule,
    EServiceUiLicenseCheckModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserListComponent, UserDetailComponent],
  exports: [UserListComponent, UserDetailComponent],
})
export class EServiceELicenseUserManagementModule {}
