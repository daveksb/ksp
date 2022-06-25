import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { CurrentUserComponent } from './current-user/current-user.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RequesterInfoComponent } from './requester-info/requester-info.component';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import {
  FormCoordinatorInfoComponent,
  FormRequesterInfoComponent,
} from '@ksp/shared/form/school/register';
import { BottomNavComponent } from '@ksp/shared/menu';
import { UniversitySelectComponent } from '@ksp/shared/form/university-select';
import { SetGrayBackgroundDirective } from '@ksp/shared/directive';

export const routes: Routes = [
  {
    path: 'current-user',
    component: CurrentUserComponent,
  },
  {
    path: 'requester-info',
    component: RequesterInfoComponent,
  },
  {
    path: 'coordinator-info',
    component: CoordinatorInfoComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    UniServiceUiNavModule,
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
    SetGrayBackgroundDirective
  ],
  declarations: [
    CurrentUserComponent,
    RequesterInfoComponent,
    CoordinatorInfoComponent,
  ],
})
export class SchoolServiceFeatureRegisterModule {}
