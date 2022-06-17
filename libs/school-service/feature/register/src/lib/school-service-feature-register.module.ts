import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthorComponent } from './author/author.component';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { CurrentUserComponent } from './current-user/current-user.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

export const routes: Routes = [
  {
    path: 'current-user',
    component: CurrentUserComponent,
  },
  {
    path: 'requester-info',
    component: RegisterComponent,
  },
  {
    path: 'coordinator-info',
    component: AuthorComponent,
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
  ],
  declarations: [RegisterComponent, AuthorComponent, CurrentUserComponent],
  exports: [RegisterComponent, AuthorComponent, CurrentUserComponent],
})
export class SchoolServiceFeatureRegisterModule {}
