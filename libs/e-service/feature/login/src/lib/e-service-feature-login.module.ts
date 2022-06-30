import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceLoginComponent } from './e-service-login/e-service-login.component';
import { LoginFormComponent } from '@ksp/shared/form/login';

@NgModule({
  imports: [CommonModule, LoginFormComponent],
  declarations: [EServiceLoginComponent],
})
export class EServiceFeatureLoginModule {}
