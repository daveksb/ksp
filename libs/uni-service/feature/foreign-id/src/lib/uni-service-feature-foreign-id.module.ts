import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqForeignIdComponent } from './req-foreign-id/req-foreign-id.component';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    SharedFormOthersModule,
    SharedUiTopNavModule,
  ],
  declarations: [ReqForeignIdComponent],
  exports: [ReqForeignIdComponent],
})
export class UniServiceFeatureForeignIdModule {}
