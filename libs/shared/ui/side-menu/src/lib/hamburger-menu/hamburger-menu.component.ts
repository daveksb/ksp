import { Component, Input, OnInit } from '@angular/core';

export interface MenuConfig2 {
  icon?: string;
  label: string;
  path: string;
  params?: any;
  subMenu?: MenuConfig2[];
  subMenuName?: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'ksp-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() menuConfig: MenuConfig2[] = [];
  @Input() showHeader = false;

  /**
   * Side menu use absolute path routing
   */
}
