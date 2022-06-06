import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqForeignIdComponent } from './req-foreign-id/req-foreign-id.component';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedUiFormModule } from '@ksp/shared/ui/form';

@NgModule({
  imports: [CommonModule, SharedUiBottomMenuModule, SharedUiFormModule],
  declarations: [ReqForeignIdComponent],
  exports: [ReqForeignIdComponent],
})
export class UniServiceFeatureForeignIdModule {}
