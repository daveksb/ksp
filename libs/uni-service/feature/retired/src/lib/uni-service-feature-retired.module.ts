import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetiredReasonComponent } from './retired-reason/retired-reason.component';
import { RetiredAttachmentComponent } from './retired-attachment/retired-attachment.component';
import { UniServiceFeatureRetiredRoutingModule } from './uni-service-feature-retired-routing.module';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { BottomNavComponent, TopNavSecondComponent } from '@ksp/shared/menu';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BasicInstituteSearchComponent,
  RetiredSearchComponent,
} from '@ksp/shared/search';
import { RetiredHomeComponent } from './retired-home/retired-home.component';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRetiredRoutingModule,
    TopNavComponent,
    TopNavSecondComponent,
    SharedFormOthersModule,
    RequestHeaderInfoComponent,
    UniServiceFormModule,
    BottomNavComponent,
    ReactiveFormsModule,
    BasicInstituteSearchComponent,
    RetiredSearchComponent,
  ],
  declarations: [
    RetiredHomeComponent,
    RetiredReasonComponent,
    RetiredAttachmentComponent,
  ],
})
export class UniServiceFeatureRetiredModule {}
