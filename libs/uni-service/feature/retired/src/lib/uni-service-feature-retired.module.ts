import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetiredSearchComponent } from './retired-search/retired-search.component';
import { RetiredReasonComponent } from './retired-reason/retired-reason.component';
import { RetiredAttachmentComponent } from './retired-attachment/retired-attachment.component';
import { UniServiceFeatureRetiredRoutingModule } from './uni-service-feature-retired-routing.module';

import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { RequestHeaderInfoComponent } from '@ksp/shared/new-ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRetiredRoutingModule,
    TopNavComponent,
    UniServiceUiNavModule,
    SharedFormOthersModule,
    RequestHeaderInfoComponent,
    UniServiceFormModule,
    SharedUiBottomMenuModule,
  ],
  declarations: [
    RetiredSearchComponent,
    RetiredReasonComponent,
    RetiredAttachmentComponent,
  ],
})
export class UniServiceFeatureRetiredModule {}
