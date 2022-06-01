import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ApprovementUserListComponent } from './approvement-user-list/approvement-user-list.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { UserDetailComponent } from '@ksp/e-service/e-license/user-detail';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

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
        component: ApprovementUserListComponent,
      },
      {
        path: 'detail',
        component: UserDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, MatDialogModule, MatTableModule ,RouterModule.forChild(routes)],
  declarations: [ApprovementUserListComponent],
})
export class EServiceELicenseUserApprovementModule {}
