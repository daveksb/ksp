import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceThaiLoginComponent } from './self-service-thai-login/self-service-thai-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UniFormBadgeComponent } from '@ksp/shared/ui';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UniFormBadgeComponent],
  declarations: [SelfServiceThaiLoginComponent],
})
export class SelfServiceFeatureLoginModule {}
