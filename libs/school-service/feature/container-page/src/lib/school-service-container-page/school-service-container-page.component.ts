import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'ksp-school-service-container-page',
  templateUrl: './school-service-container-page.component.html',
  styleUrls: ['./school-service-container-page.component.css'],
})
export class SchoolServiceContainerPageComponent {
  menuConfig: MenuConfig[];

  constructor() {
    this.menuConfig = [
      {
        icon: 'assets/images/icon-sidenav/home.svg ',
        label: 'หน้าแรก',
        path: '',
      },
      {
        icon: 'assets/images/icon-sidenav/paper.svg',
        label: 'ยื่นใบคำขอ',
        path: '',
        subMenuName: 'license',
        isExpanded: true,
        subMenu: [
          {
            label:
              'ขอใบอนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)',
            path: 'request',
          },
          {
            label: 'ขอต่ออายุใบประกอบวิชาชีพ',
            path: '',
          },
        ],
      },
      {
        icon: 'assets/images/icon-sidenav/event.svg',
        label: 'กิจกรรมการพัฒนาตัวเอง',
        path: '',
      },
      {
        icon: 'assets/images/icon-sidenav/reward.svg',
        label: 'รางวัลของฉัน',
        path: '',
      },
      {
        icon: 'assets/images/icon-sidenav/people.svg',
        label: 'ข้อมูลของฉัน',
        path: '',
        subMenuName: 'myProfile',
        subMenu: [
          {
            label: 'ข้อมูลส่วนตัว',
            path: '',
          },
          {
            label: 'สถานที่ทำงาน',
            path: '',
          },
          {
            label: 'ข้อมูลการศึกษา',
            path: '',
          },
          {
            label: 'ข้อมูลประสบการณ์วิชาชีพ',
            path: '',
          },
          {
            label: 'ข้อมูลผลการประเมินสมรรถนะ',
            path: '',
          },
          {
            label: 'ประวัติการชำระเงินและใบเสร็จรับเงิน',
            path: 'payment-history',
          },
        ],
      },
    ];
  }
}
