import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetiredSearchComponent } from './retired-search/retired-search.component';
import { RetiredReasonComponent } from './retired-reason/retired-reason.component';
import { RetiredAttachmentComponent } from './retired-attachment/retired-attachment.component';
import { RetiredConfirmComponent } from './retired-confirm/retired-confirm.component';
import { RetiredCompleteComponent } from './retired-complete/retired-complete.component';
import { UniServiceFeatureRetiredRoutingModule } from './uni-service-feature-retired-routing.module';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRetiredRoutingModule,
    SharedUiTopNavModule,
  ],
  declarations: [
    RetiredSearchComponent,
    RetiredReasonComponent,
    RetiredAttachmentComponent,
    RetiredConfirmComponent,
    RetiredCompleteComponent,
  ],
  exports: [
    RetiredSearchComponent,
    RetiredReasonComponent,
    RetiredAttachmentComponent,
    RetiredConfirmComponent,
    RetiredCompleteComponent,
  ],
})
export class UniServiceFeatureRetiredModule {}
