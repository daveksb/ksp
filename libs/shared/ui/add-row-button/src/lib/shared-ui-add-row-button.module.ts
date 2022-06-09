import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRowButtonComponent } from './add-row-button/add-row-button.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [AddRowButtonComponent],
  exports: [AddRowButtonComponent],
})
export class SharedUiAddRowButtonModule {}
