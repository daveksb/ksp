import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterStepOneComponent } from './register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './register-step-two/register-step-two.component';
import { RegisterStepThreeComponent } from './register-step-three/register-step-three.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'step-1',
  },
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
    SelfServiceUiFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
  ],
  exports: [
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
  ],
})
export class SelfServiceFeatureRegisterModule {}
