import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyResultComponent } from './verify-result/verify-result.component';
import { MatIconModule } from '@angular/material/icon';
import { ConsiderResultComponent } from './consider-result/consider-result.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [VerifyResultComponent, ConsiderResultComponent],
  exports: [VerifyResultComponent, ConsiderResultComponent],
})
export class EServiceUiVerifyResultBoxModule {}
