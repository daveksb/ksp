import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolServiceLoginComponent } from './school-service-login/school-service-login.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@ksp/shared/form/login';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    LoginFormComponent,
  ],
  declarations: [SchoolServiceLoginComponent],
  exports: [SchoolServiceLoginComponent],
})
export class SchoolServiceFeatureLoginModule {}
