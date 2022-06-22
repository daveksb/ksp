import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

import { ForeignIdComponent } from './foreign-id/foreign-id.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/new-ui';
import { TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    SharedFormOthersModule,
    TopNavComponent,
    RequestHeaderInfoComponent,
  ],
  declarations: [ForeignIdComponent],
  exports: [ForeignIdComponent],
})
export class UniServiceFeatureForeignIdModule {}
