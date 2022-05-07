import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfServiceBoxMenuComponent } from './self-service-box-menu/self-service-box-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SelfServiceBoxMenuComponent],
  exports: [SelfServiceBoxMenuComponent],
})
export class SelfServiceUiMenuModule {}
