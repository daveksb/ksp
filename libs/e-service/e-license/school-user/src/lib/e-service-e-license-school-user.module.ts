import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from '@ksp/e-service/e-license/user-detail';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ManageCurrentUserListComponent } from './current-user-list/manage-current-user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EServiceRequestSearchComponent,
  EServiceUserSearchComponent,
} from '@ksp/shared/search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApproveNewUserListComponent } from './new-user-list/approve-new-user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'current-user',
        component: ManageCurrentUserListComponent,
      },
      {
        path: 'new-user',
        component: ApproveNewUserListComponent,
      },
      /*       {
        path: 'user-detail',
        component: UserDetailComponent,
      }, */
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

/*
export const routes: Route[] = [
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
        component: ApproveNewUserListComponent,
      },
      {
        path: 'detail/:id',
        component: UserDetailComponent,
      },
    ],
  },
];
*/

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    TopNavComponent,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EServiceUserSearchComponent,
    EServiceRequestSearchComponent,
    MatPaginatorModule,
  ],
  declarations: [ManageCurrentUserListComponent, ApproveNewUserListComponent],
})
export class EServiceELicenseSchoolUserModule {}
