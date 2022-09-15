import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCurrentUserComponent } from './register-current-user/register-current-user.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RegisterRequesterComponent } from './register-requester/register-requester.component';
import { CoordinatorInfoComponent } from './register-coordinator/register-coordinator.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';
import {
  BottomNavComponent,
  StepperNavComponent,
  TopNavSecondComponent,
} from '@ksp/shared/menu';
import { UniversitySelectComponent } from '@ksp/shared/form/university-select';
import { RegisterPasswordComponent } from './register-password/register-password.component';

export const routes: Routes = [
  {
    path: 'current-user',
    component: RegisterCurrentUserComponent,
  },
  {
    path: 'requester',
    component: RegisterRequesterComponent,
  },
  {
    path: 'coordinator',
    component: CoordinatorInfoComponent,
  },
  {
    path: 'password',
    component: RegisterPasswordComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavSecondComponent,
    SharedFormOthersModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    RequestHeaderInfoComponent,
    FormRequesterInfoComponent,
    FormCoordinatorInfoComponent,
    BottomNavComponent,
    UniversitySelectComponent,
    StepperNavComponent,
  ],
  declarations: [
    RegisterCurrentUserComponent,
    RegisterRequesterComponent,
    CoordinatorInfoComponent,
    RegisterPasswordComponent,
  ],
})
export class SchoolServiceFeatureRegisterModule {}
