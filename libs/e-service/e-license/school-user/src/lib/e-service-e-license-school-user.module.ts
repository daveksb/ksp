import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ManageCurrentUserListComponent } from './current-user-list/manage-current-user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EServiceRequestSearchComponent,
  EServiceUserSearchComponent,
} from '@ksp/shared/search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApproveNewUserListComponent } from './new-user-list/approve-new-user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { AllUserListComponent } from './all-user-list/all-user-list.component';
import { ThaiDatePipe } from '@ksp/shared/pipe';

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
      {
        path: 'all-user',
        component: AllUserListComponent,
      },
      {
        path: 'user-detail',
        component: UserDetailComponent,
      },
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
    BottomNavComponent,
    LicenseCheckComponent,
    FormRequesterInfoComponent,
    FormCoordinatorInfoComponent,
    SharedFormOthersModule,
    RequestHeaderInfoComponent,
    ThaiDatePipe,
  ],
  declarations: [
    ManageCurrentUserListComponent,
    ApproveNewUserListComponent,
    UserDetailComponent,
    AllUserListComponent,
  ],
  exports: [AllUserListComponent],
})
export class EServiceELicenseSchoolUserModule {}
