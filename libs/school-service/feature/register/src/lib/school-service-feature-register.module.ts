import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthorComponent } from './author/author.component';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { CurrentUserComponent } from './current-user/current-user.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: 'current-user',
    component: CurrentUserComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'author',
    component: AuthorComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    UniServiceUiNavModule,
    SharedFormOthersModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RegisterComponent, AuthorComponent, CurrentUserComponent],
  exports: [RegisterComponent, AuthorComponent, CurrentUserComponent],
})
export class SchoolServiceFeatureRegisterModule {}
