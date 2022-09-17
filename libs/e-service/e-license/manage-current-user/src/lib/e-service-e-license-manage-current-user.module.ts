import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from '@ksp/e-service/e-license/user-detail';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ManageCurrentUserListComponent } from './user-list/manage-current-user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EServiceRequestSearchComponent,
  EServiceUserSearchComponent,
} from '@ksp/shared/search';
import { MatPaginatorModule } from '@angular/material/paginator';

export const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: ManageCurrentUserListComponent,
      },
      {
        path: 'detail',
        component: UserDetailComponent,
      },
      {
        path: 'detail/:id',
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
    MatPaginatorModule,
  ],
  declarations: [ManageCurrentUserListComponent],
})
export class EServiceELicenseManageCurrentUserModule {}
