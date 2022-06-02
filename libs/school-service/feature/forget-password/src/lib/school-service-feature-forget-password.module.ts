import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: 'confirm-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'set-password',
    component: SetNewPasswordComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UniServiceUiNavModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ForgetPasswordComponent, SetNewPasswordComponent],
  exports: [ForgetPasswordComponent, SetNewPasswordComponent],
})
export class SchoolServiceFeatureForgetPasswordModule {}
