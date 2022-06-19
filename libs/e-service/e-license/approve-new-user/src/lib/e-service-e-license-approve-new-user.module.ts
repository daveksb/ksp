import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ApproveNewUserListComponent } from './approve-new-user-list/approve-new-user-list.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { UserDetailComponent } from '@ksp/e-service/e-license/user-detail';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { MatIconModule } from '@angular/material/icon';

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
        path: 'detail',
        component: UserDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    RouterModule.forChild(routes),
    SharedUiTopNavModule,
    MatIconModule,
  ],
  declarations: [ApproveNewUserListComponent],
})
export class EServiceELicenseApproveNewUserModule {}
