import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceRegisterComponent } from './uni-service-register/uni-service-register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [UniServiceRegisterComponent],
  exports: [UniServiceRegisterComponent],
})
export class UniServiceFeatureRegisterModule {}
