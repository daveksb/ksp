import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversitySearchComponent } from './university-search/university-search.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicInstituteSearchComponent } from '@ksp/shared/form/search';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    BasicInstituteSearchComponent,
  ],
  declarations: [UniversitySearchComponent],
  exports: [UniversitySearchComponent],
})
export class SharedFormUniversitySearchModule {}
