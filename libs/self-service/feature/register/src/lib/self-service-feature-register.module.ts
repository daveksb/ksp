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
import { RegisterForeignComponent } from './register-foreign/register-foreign.component';
import { RegisterForeignStepOneComponent } from './register-foreign-step-one/register-foreign-step-one.component';
import { RegisterForeignStepThreeComponent } from './register-foreign-step-three/register-foreign-step-three.component';
import { RegisterForeignStepTwoComponent } from './register-foreign-step-two/register-foreign-step-two.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'step-1',
  },
  { path: 'policy', component: PrivacyPolicyComponent },
  {
    path: 'th-step-1',
    component: RegisterStepOneComponent,
  },
  {
    path: 'th-step-2',
    component: RegisterStepTwoComponent,
  },
  {
    path: 'th-step-3',
    component: RegisterStepThreeComponent,
  },
  {
    path: 'en-step-0',
    component: RegisterForeignComponent,
  },
  {
    path: 'en-step-1',
    component: RegisterForeignStepOneComponent,
  },
  {
    path: 'en-step-2',
    component: RegisterForeignStepTwoComponent,
  },
  {
    path: 'en-step-3',
    component: RegisterForeignStepThreeComponent,
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
    SharedFormOthersModule,
  ],
  declarations: [
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
    PrivacyPolicyComponent,
    RegisterCompletedComponent,
    RegisterForeignComponent,
    RegisterForeignStepOneComponent,
    RegisterForeignStepThreeComponent,
    RegisterForeignStepTwoComponent,
  ],
  exports: [
    RegisterForeignComponent,
    RegisterForeignStepOneComponent,
    RegisterForeignStepThreeComponent,
    RegisterForeignStepTwoComponent,
  ],
})
export class SelfServiceFeatureRegisterModule {}
