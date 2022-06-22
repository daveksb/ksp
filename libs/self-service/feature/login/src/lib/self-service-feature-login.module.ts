import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceThaiLoginComponent } from './self-service-thai-login/self-service-thai-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [SelfServiceThaiLoginComponent],
})
export class SelfServiceFeatureLoginModule {}
