import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceLoginComponent } from './e-service-login/e-service-login.component';
import { LoginFormComponent } from '@ksp/shared/form/login';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, LoginFormComponent, ReactiveFormsModule],
  declarations: [EServiceLoginComponent],
})
export class EServiceFeatureLoginModule {}
