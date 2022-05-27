import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyResultComponent } from './verify-result/verify-result.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [VerifyResultComponent],
  exports: [VerifyResultComponent],
})
export class EServiceUiVerifyResultBoxModule {}
