import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'ksp-self-service-master-page',
  templateUrl: './self-service-master-page.component.html',
  styleUrls: ['./self-service-master-page.component.scss'],
})
export class SelfServiceMasterPageComponent {
  menuConfig: MenuConfig[];

  constructor() {
    this.menuConfig = menu;
  }
}

export const menu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/home.svg ',
    label: 'หน้าแรก',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นใบคำขอ',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบอนุญาตประกอบวิชาชีพ',
    path: '',
    subMenuName: 'license',
    isExpanded: false,
    subMenu: [
      {
        label: 'ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ',
        path: 'request',
      },
      {
        label: 'ขอต่ออายุใบประกอบวิชาชีพ',
        path: '',
      },
      {
        label: 'ขอใบแทนใบอนุญาตประกอบวิชาชีพ',
        path: '',
      },
      {
        label: '##ช่องทางชำระเงิน',
        path: 'payment-channel',
      },
      {
        label: '##แก้ไขใบอนุญาต',
        path: 'edit',
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
    subMenuName: 'my-info',
    subMenu: [
      {
        label: 'ข้อมูลส่วนตัว',
        path: 'my-info/a',
      },
      {
        label: 'สถานที่ทำงาน',
        path: 'my-info/b',
      },
      {
        label: 'ข้อมูลการศึกษา',
        path: 'my-info/c',
      },
      {
        label: 'ข้อมูลประสบการณ์วิชาชีพ',
        path: 'my-info/d',
      },
      {
        label: 'ข้อมูลผลการประเมินสมรรถนะ',
        path: 'my-info/e',
      },
      {
        label: 'ประวัติการชำระเงินและใบเสร็จรับเงิน',
        path: 'my-info/payment-history',
      },
    ],
  },
];
