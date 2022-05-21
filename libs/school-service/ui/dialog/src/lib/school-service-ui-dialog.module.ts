import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenPropertyComponent } from './forbidden-property/forbidden-property.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ForbiddenPropertyComponent],
  exports: [ForbiddenPropertyComponent],
})
export class SchoolServiceUiDialogModule {}
