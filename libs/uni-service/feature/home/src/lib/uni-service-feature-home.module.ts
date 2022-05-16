import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceHomeComponent } from './uni-service-home/uni-service-home.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';

@NgModule({
  imports: [CommonModule, SelfServiceUiFormsModule],
  declarations: [UniServiceHomeComponent],
  exports: [UniServiceHomeComponent],
})
export class UniServiceFeatureHomeModule {}
