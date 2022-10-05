import { Component, Input, OnInit } from '@angular/core';
import { MenuConfig } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() menuConfig: MenuConfig[] = [];
  @Input() showHeader = false;
  @Input() name = '';
  @Input() lastLogin = '';

  /**
   * Side menu use absolute path routing
   */
}
