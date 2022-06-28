import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationSearchComponent } from './accusation-search/accusation-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AccusationSearchComponent],
  exports: [AccusationSearchComponent],
})
export class EServiceUiAccusationSearchModule {}
