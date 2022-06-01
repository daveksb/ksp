import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenPropertyComponent } from './forbidden-property/forbidden-property.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [ForbiddenPropertyComponent],
  exports: [ForbiddenPropertyComponent],
})
export class SchoolServiceDialogModule {}
