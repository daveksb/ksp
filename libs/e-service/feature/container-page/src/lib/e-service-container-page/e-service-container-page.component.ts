import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'ksp-e-service-container-page',
  templateUrl: './e-service-container-page.component.html',
  styleUrls: ['./e-service-container-page.component.css'],
})
export class EServiceContainerPageComponent {
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
            path: 'degree-cert',
            label: 'ขอรับรองปริญญาและประกาศนียบัตร',
          },
          {
            path: 'foreign-id',
            label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับนักศึกษาชาวต่างชาติ',
          },
          {
            path: 'list-of-students',
            label: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
          },
          {
            path: 'list-of-graduates',
            label: 'ขอเปลี่ยนแปลงรายละเอียดปริญญาและประกาศนียบัตร',
          },
          {
            path: '',
            label: 'ขอเปลี่ยนแปลงรายละเอียดรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
          },
        ],
        subMenuName: 'license',
        isExpanded: true,
      },
      {
        icon: 'assets/images/icon-sidenav/card.svg',
        label: 'ทะเบียนข้อมูล',
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
