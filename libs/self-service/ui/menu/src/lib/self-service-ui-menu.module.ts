import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceSideMenuComponent } from './self-service-side-menu/self-service-side-menu.component';
import { SelfServiceBoxMenuComponent } from './self-service-box-menu/self-service-box-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SelfServiceSideMenuComponent, SelfServiceBoxMenuComponent],
  exports: [SelfServiceSideMenuComponent, SelfServiceBoxMenuComponent],
})
export class SelfServiceUiMenuModule {}
