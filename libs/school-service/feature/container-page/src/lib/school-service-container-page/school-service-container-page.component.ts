import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'school-service-container-page',
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
            path: 'temp-license/list',
          },
          {
            label:
              'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ผู้บริหารสถานศึกษา)',
            path: 'temp-license/list',
          },
          {
            label:
              'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวต่างชาติ)',
            path: 'temp-license/list',
          },
          {
            label:
              'ขอสร้างเลขประจำตัวคุรุสภาสำหรับครูชาวต่างชาติ',
            path: 'temp-license/list',
          },
          {
            label:
              'ขอหนังสือรับรองคุณวุฒิ',
            path: 'temp-license/list',
          },
          {
            label:
              'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI)',
            path: 'temp-license/list',
          },

        ],
      },
      {
        icon: 'assets/images/icon-sidenav/event.svg',
        label: 'ทะเบียนบุคลากรภายในหน่วยงาน',
        path: '',
      },
      {
        icon: 'assets/images/icon-sidenav/reward.svg',
        label: 'ทะเบียนหนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต',
        path: '',
      },
      {
        icon: 'assets/images/icon-sidenav/reward.svg',
        label: 'รายงาน',
        path: '',
      },

    ];
  }
}
