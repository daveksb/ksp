import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceLoginComponent } from './e-service-login/e-service-login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [EServiceLoginComponent],
  exports: [EServiceLoginComponent],
})
export class EServiceFeatureLoginModule {}
