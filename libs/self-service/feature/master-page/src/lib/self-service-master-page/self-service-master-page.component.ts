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
    subMenuName: 'request',
    subMenu: [
      {
        label: 'ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ',
        path: 'license/request',
      },
      {
        label: 'ขอต่ออายุใบประกอบวิชาชีพ',
        path: 'license/a',
      },
      {
        label: 'ขอหนังสืออนุญาตชั่วคราว',
        path: 'license/b',
      },
      {
        label: 'ขอเปลั้ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ',
        path: 'license/edit',
      },
      {
        label: 'ขอใบแทนใบอนุญาตประกอบวิชาชีพ',
        path: 'license/d',
      },
      {
        label: 'ขอหนังสืออนุญาตปฎิบัติการสอน',
        path: 'license/e',
      },
      {
        label: 'ขอหนังสือรับรองความรู้',
        path: 'license/f',
      },
      {
        label: 'ขอยื่นเทียบเคียงความรู้',
        path: 'license/g',
      },
      {
        label: 'ขอคืนเงินค่าธรรมเนียม',
        path: 'license/h',
      },
      {
        label: 'ขอรับรางวัลการยกย่องเชิดชูเกียรติ',
        path: 'license/i',
      },
      {
        label: '##ช่องทางชำระเงิน##',
        path: 'license/payment-channel',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบอนุญาตประกอบวิชาชีพ',
    path: '',
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
        path: 'my-info/person-info',
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
