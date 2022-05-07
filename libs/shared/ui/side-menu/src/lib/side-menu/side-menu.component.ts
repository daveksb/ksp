import { Component } from '@angular/core';

@Component({
  selector: 'ksp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  menuConfig = [
    {
      icon: 'assets/images/icon-sidenav/home.svg ',
      label: 'หน้าแรก',
      subMenu: null,
    },
    {
      icon: 'assets/images/icon-sidenav/paper.svg',
      label: 'ยื่นใบคำขอ',
      subMenu: [
        {
          url: 'home',
          label: 'ขอรับรอง...',
        },
        {
          url: '',
          label: 'ขอสร้าง..',
        },
      ],
      isExpanded: true,
    },
    {
      icon: 'assets/images/icon-sidenav/card.svg',
      label: 'ทะเบียน',
      subMenu: [],
    },
    {
      icon: 'assets/images/icon-sidenav/card.svg',
      label: 'รายงาน',
      subMenu: [],
    },
    {
      icon: 'assets/images/icon-sidenav/card.svg',
      label: 'ตั้งค่า',
      subMenu: [],
    },
  ];
}
