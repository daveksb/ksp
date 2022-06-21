import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetiredSearchComponent } from './retired-search/retired-search.component';
import { RetiredReasonComponent } from './retired-reason/retired-reason.component';
import { RetiredAttachmentComponent } from './retired-attachment/retired-attachment.component';

import { UniServiceFeatureRetiredRoutingModule } from './uni-service-feature-retired-routing.module';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui/request-header-info';
import { UniServiceUiFormsModule } from '@ksp/uni-service/ui/forms';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRetiredRoutingModule,
    SharedUiTopNavModule,
    UniServiceUiNavModule,
    SharedFormOthersModule,
    RequestHeaderInfoComponent,
    UniServiceUiFormsModule

  ],
  declarations: [
    RetiredSearchComponent,
    RetiredReasonComponent,
    RetiredAttachmentComponent,
  ],
  exports: [
    RetiredSearchComponent,
    RetiredReasonComponent,
    RetiredAttachmentComponent,
  ],
})
export class UniServiceFeatureRetiredModule {}
