import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'ksp-uni-service-container-page',
  templateUrl: './uni-service-container-page.component.html',
  styleUrls: ['./uni-service-container-page.component.css'],
})
export class UniServiceContainerPageComponent {
  menuConfig: MenuConfig[];

  constructor() {
    this.menuConfig = [
      {
        icon: 'assets/images/icon-sidenav/home.svg ',
        label: 'หน้าแรก',
        path: 'home',
      },
      {
        icon: 'assets/images/icon-sidenav/paper.svg',
        label: 'ยื่นใบคำขอ',
        path: '',
        subMenu: [
          {
            path: 'request',
            label: 'ขอรับรองปริญญาและประกาศนียบัตร',
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
    ];
  }
}
