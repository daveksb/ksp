import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitySearchComponent } from './university-search/university-search.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UniversitySearchComponent],
  exports: [UniversitySearchComponent],
})
export class SharedUiUniversitySearchModule {}
