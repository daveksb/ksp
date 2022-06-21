import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitySelectComponent } from './university-select/university-select.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UniversitySelectComponent],
  exports: [UniversitySelectComponent],
})
export class SharedFormUniversitySelectModule {}
