import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentDirective } from './dynamic-component.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DynamicComponentDirective
  ],
  exports: [
    DynamicComponentDirective
  ],
})
export class SharedDirectiveModule {}
