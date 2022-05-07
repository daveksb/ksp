import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceHomeComponent } from './uni-service-home/uni-service-home.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UniServiceHomeComponent],
  exports: [UniServiceHomeComponent],
})
export class UniServiceFeatureHomeModule {}
