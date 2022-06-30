import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceLoginComponent } from './uni-service-login/uni-service-login.component';
import { LoginFormComponent } from '@ksp/shared/form/login';

@NgModule({
  imports: [CommonModule, LoginFormComponent],
  declarations: [UniServiceLoginComponent],
})
export class UniServiceFeatureLoginModule {}
