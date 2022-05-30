import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishReviewComponent } from './publish-review/publish-review.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [CommonModule, MatTabsModule],
  declarations: [PublishReviewComponent],
  exports: [PublishReviewComponent],
})
export class EServiceEthicsPublishModule {}
