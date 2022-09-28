import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuConfig } from '@ksp/shared/interface';
import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';

@Component({
  templateUrl: './self-service-master-page.component.html',
  styleUrls: ['./self-service-master-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SharedMenuModule, TopNavComponent],
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
    path: '/home',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นใบคำขอ',
    path: '',
    subMenuName: 'request',
    subMenu: [
      {
        label: 'ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ',
        path: '',
        subMenuName: 'registerLicense',
        subMenu: [
          {
            label: 'ครู',
            path: '',
            subMenuName: 'teacherType',
            subMenu: [
              /*          {
                label: 'ครูชาวไทย',
                path: '/license/teacher',
              }, */
              {
                label: 'ครูชาวไทย',
                path: '/license/request/1',
              },
              {
                label: 'ครูชาวต่างชาติ',
                path: '/license/agreement',
                params: '1',
              },
            ],
          },
          {
            label: 'ผู้บริหารสถานศึกษา',
            path: '',
            subMenuName: 'manageType',
            subMenu: [
              /*           {
                label: 'ผู้บริหารสถานศึกษาชาวไทย',
                path: '/license/school-manager',
              }, */
              {
                label: 'ผู้บริหารสถานศึกษาชาวไทย',
                path: '/license/request/2',
              },
              {
                label: 'ผู้บริหารสถานศึกษาชาวต่างชาติ',
                path: '/license/agreement',
                params: '2',
              },
            ],
          },
          /*           {
            label: 'ผู้บริหารการศึกษา',
            path: '/license/education-manager',
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/license/study-supervision',
          }, */
          {
            label: 'ผู้บริหารการศึกษา',
            path: '/license/request/3',
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/license/request/4',
          },
        ],
      },
      {
        label: 'ขอต่ออายุใบอนุญาตประกอบวิชาชีพ',
        path: '/renew-license/request',
        subMenuName: 'renewLicense',
        subMenu: [
          {
            label: 'ครู',
            path: '',
            subMenuName: 'teacherType',
            subMenu: [
              {
                label: 'ครูชาวไทย',
                path: '/renew-license/request/1',
                //path: '/renew-license/request',
              },
              {
                label: 'ครูชาวต่างชาติ',
                path: '/renew-license/foreign',
                params: '1',
              },
            ],
          },
          {
            label: 'ผู้บริหารสถานศึกษา',
            path: '',
            subMenuName: 'manageType',
            subMenu: [
              {
                label: 'ผู้บริหารสถานศึกษาชาวไทย',
                path: '/renew-license/request/2',
                //path: '/renew-license/school-manager',
              },
              {
                label: 'ผู้บริหารสถานศึกษาชาวต่างชาติ',
                path: '/renew-license/foreign',
                params: '2',
              },
            ],
          },
          /*   {
            label: 'ผู้บริหารการศึกษา',
            path: '/renew-license/education-manager',
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/renew-license/study-supervision',
          }, */
          {
            label: 'ผู้บริหารการศึกษา',
            path: '/renew-license/request/3',
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/renew-license/request/4',
          },
        ],
      },
      {
        label: 'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ',
        path: '/license/edit',
      },
      {
        label: 'ขอใบแทนใบอนุญาตประกอบวิชาชีพ',
        path: '/substitute-license/request',
      },
      {
        label: 'ขอหนังสือรับรองความรู้',
        path: '/transfer-knowledge/request',
      },
      {
        label: 'ขอยื่นเทียบเคียงความรู้',
        path: '/compare-knowledge/request',
      },
      {
        label: 'ขอคืนเงินค่าธรรมเนียม',
        path: '/refund-fee/request',
      },
      {
        label: 'ขอรับรางวัลการยกย่องเชิดชูเกียรติ',
        path: '/reward/request',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบอนุญาตประกอบวิชาชีพ',
    path: '/home',
  },
  {
    icon: 'assets/images/icon-sidenav/event.svg',
    label: 'กิจกรรมการพัฒนาตัวเอง',
    path: '/self-improvement/request',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'รางวัลของฉัน',
    path: '/reward/list',
  },
  {
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'ข้อมูลของฉัน',
    path: '',
    subMenuName: 'myInfo',
    subMenu: [
      {
        label: 'ข้อมูลส่วนตัว',
        path: '/my-info/person-info',
      },
      {
        label: 'ที่อยู่',
        path: '/my-info/address-info',
      },
      {
        label: 'สถานที่ทำงาน',
        path: '/my-info/workplace-info',
      },
      {
        label: 'ข้อมูลการศึกษา',
        path: '/my-info/education-info',
      },
      {
        label: 'ข้อมูลประสบการณ์วิชาชีพ',
        path: '/my-info/profession-experience',
      },
      {
        label: 'ข้อมูลผลการประเมินสมรรถนะ',
        path: '/my-info/performance-result',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ประวัติการชำระเงิน',
    path: '/my-info/payment-history',
  },
  {
    icon: 'assets/images/icon-sidenav/gear-fill.svg',
    label: 'ออกจากระบบ',
    path: '',
  },
];
