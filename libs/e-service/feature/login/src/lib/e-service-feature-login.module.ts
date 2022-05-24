import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceLoginComponent } from './e-service-login/e-service-login.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EServiceLoginComponent],
  exports: [EServiceLoginComponent],
})
export class EServiceFeatureLoginModule {}
