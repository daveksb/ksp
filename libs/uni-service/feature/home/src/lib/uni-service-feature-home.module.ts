import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceHomeComponent } from './uni-service-home/uni-service-home.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

@NgModule({
  imports: [CommonModule, SelfServiceUiFormsModule, MatTableModule, SharedUiTopNavModule],
  declarations: [UniServiceHomeComponent],
  exports: [UniServiceHomeComponent],
})
export class UniServiceFeatureHomeModule {}
