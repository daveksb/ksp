import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterStepOneComponent } from './register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './register-step-two/register-step-two.component';
import { RegisterStepThreeComponent } from './register-step-three/register-step-three.component';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'step-1',
  },
  { path: 'policy', component: PrivacyPolicyComponent },
  {
    path: 'step-1',
    component: RegisterStepOneComponent,
  },
  {
    path: 'step-2',
    component: RegisterStepTwoComponent,
  },
  {
    path: 'step-3',
    component: RegisterStepThreeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    SelfServiceFormModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatIconModule,
  ],
  declarations: [
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
    PrivacyPolicyComponent,
    RegisterCompletedComponent,
  ],
})
export class SelfServiceFeatureRegisterModule {}
