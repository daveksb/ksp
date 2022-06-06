import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RegisterCompletedComponent],
  exports: [RegisterCompletedComponent],
})
export class SelfServiceUiContentModule {}
