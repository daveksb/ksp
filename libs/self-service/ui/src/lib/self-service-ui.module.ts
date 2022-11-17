import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LicenseSaveSuccessComponent } from './license-save-success/license-save-success.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LicenseSaveSuccessComponent],
  exports: [LicenseSaveSuccessComponent],
})
export class SelfServiceUiModule {}
