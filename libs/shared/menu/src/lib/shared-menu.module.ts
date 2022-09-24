import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [CommonModule, RouterModule, MatMenuModule],
  declarations: [SideMenuComponent, HamburgerMenuComponent],
  exports: [SideMenuComponent, HamburgerMenuComponent],
})
export class SharedMenuModule {}
