import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceThaiLoginComponent } from './self-service-thai-login/self-service-thai-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UniFormBadgeComponent,
    MatButtonToggleModule,
  ],
  declarations: [SelfServiceThaiLoginComponent],
})
export class SelfServiceFeatureLoginModule {}
