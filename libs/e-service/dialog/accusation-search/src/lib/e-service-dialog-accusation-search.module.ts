import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationSearchComponent } from './accusation-search/accusation-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    EServiceUiAccusationInfoModule,
  ],
  declarations: [AccusationSearchComponent],
  exports: [AccusationSearchComponent],
})
export class EServiceDialogAccusationSearchModule {}
