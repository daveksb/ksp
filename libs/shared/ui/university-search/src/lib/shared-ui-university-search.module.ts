import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitySearchComponent } from './university-search/university-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [UniversitySearchComponent],
  exports: [UniversitySearchComponent],
})
export class SharedUiUniversitySearchModule {}
