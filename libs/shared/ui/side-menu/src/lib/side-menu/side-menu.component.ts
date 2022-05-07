import { Component, Input } from '@angular/core';

export interface MenuConfig {
  icon?: string;
  label: string;
  path: string;
  subMenu?: MenuConfig[];
  subMenuName?: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'ksp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() menuConfig: MenuConfig[] = [];
  @Input() showHeader = false;
}
