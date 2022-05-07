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

  /* menuConfig: MenuConfig[] = [
    {
      icon: 'assets/images/icon-sidenav/home.svg ',
      label: 'หน้าแรก',
      path: '',
    },
    {
      icon: 'assets/images/icon-sidenav/paper.svg',
      label: 'ยื่นใบคำขอ',
      path: '',
      subMenu: [
        {
          path: 'home',
          label: 'ขอรับรอง...',
        },
        {
          path: '',
          label: 'ขอสร้าง..',
        },
      ],
      subMenuName: 'license',
      isExpanded: true,
    },
    {
      icon: 'assets/images/icon-sidenav/card.svg',
      label: 'ทะเบียน',
      path: '',
    },
    {
      icon: 'assets/images/icon-sidenav/card.svg',
      label: 'รายงาน',
      path: '',
    },
    {
      icon: 'assets/images/icon-sidenav/card.svg',
      label: 'ตั้งค่า',
      path: '',
    },
  ]; */
}
