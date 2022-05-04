import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';

@NgModule({
  imports: [CommonModule, SelfServiceUiFormsModule],
  declarations: [TabContainerComponent],
  exports: [TabContainerComponent],
})
export class SelfServiceUiTabContainerModule {}
