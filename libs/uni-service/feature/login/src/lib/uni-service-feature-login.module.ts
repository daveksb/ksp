import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceLoginComponent } from './uni-service-login/uni-service-login.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UniServiceLoginComponent],
  exports: [UniServiceLoginComponent],
})
export class UniServiceFeatureLoginModule {}
