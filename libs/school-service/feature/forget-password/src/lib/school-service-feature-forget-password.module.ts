import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonIdComponent } from './person-id/person-id.component';
import { RouterModule, Routes } from '@angular/router';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopNavSecondComponent } from '@ksp/shared/menu';

export const routes: Routes = [
  {
    path: 'person-id',
    component: PersonIdComponent,
  },
  {
    path: 'set-new-password',
    component: SetNewPasswordComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavSecondComponent,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PersonIdComponent, SetNewPasswordComponent],
})
export class SchoolServiceFeatureForgetPasswordModule {}
