import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

import { ForeignIdComponent } from './foreign-id/foreign-id.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    TopNavComponent,
    RequestHeaderInfoComponent,
    ReactiveFormsModule
  ],
  declarations: [ForeignIdComponent],
  exports: [ForeignIdComponent],
})
export class UniServiceFeatureForeignIdModule {}
