import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationListComponent } from './accusation-list/accusation-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccusationListComponent],
  exports: [AccusationListComponent],
})
export class EServiceFeatureAccusationListModule {}
