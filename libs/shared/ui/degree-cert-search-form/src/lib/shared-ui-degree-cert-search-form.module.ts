import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchFormComponent],
  exports: [SearchFormComponent],
})
export class SharedUiDegreeCertSearchFormModule {}
