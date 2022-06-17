import { Component, Input, OnInit } from '@angular/core';
import { MenuConfig } from '../side-menu/side-menu.component';

@Component({
  selector: 'ksp-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() menuConfig: MenuConfig[] = [];
  @Input() showHeader = false;

  /**
   * Side menu use absolute path routing
   */
}
