import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { ForeignIdComponent } from './foreign-id/foreign-id.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    SharedFormOthersModule,
    SharedUiTopNavModule,
  ],
  declarations: [ForeignIdComponent],
  exports: [ForeignIdComponent],
})
export class UniServiceFeatureForeignIdModule {}
