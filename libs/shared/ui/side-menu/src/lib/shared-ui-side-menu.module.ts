import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SideMenuComponent, HamburgerMenuComponent],
  exports: [SideMenuComponent, HamburgerMenuComponent],
})
export class SharedUiSideMenuModule {}
