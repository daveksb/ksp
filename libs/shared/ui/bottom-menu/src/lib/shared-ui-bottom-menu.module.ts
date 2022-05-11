import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BottomMenuComponent],
  exports: [BottomMenuComponent],
})
export class SharedUiBottomMenuModule {}
