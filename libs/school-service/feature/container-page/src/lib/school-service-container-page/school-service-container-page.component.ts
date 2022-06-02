import { Component, OnInit } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'school-service-container-page',
  templateUrl: './school-service-container-page.component.html',
  styleUrls: ['./school-service-container-page.component.css'],
})
export class SchoolServiceContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];

  ngOnInit(): void {
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
    subMenuName: 'license',
    isExpanded: true,
    subMenu: [
      {
        label: 'ขอใบอนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)',
        path: 'temp-license/detail',
        params: { type: 1 },
      },
      {
        label:
          'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ผู้บริหารสถานศึกษา)',
        path: 'temp-license/detail',
        params: { type: 2 },
      },
      {
        label:
          'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวต่างชาติ)',
        path: 'temp-license/detail',
        params: { type: 3 },
      },
      {
        label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับครูชาวต่างชาติ',
        path: 'foreign-id',
      },
      {
        label: 'ขอหนังสือรับรองคุณวุฒิ',
        path: 'temp-license/aa',
      },
      {
        label:
          'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI)',
        path: 'temp-license/bb',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/event.svg',
    label: 'ทะเบียนบุคลากรภายในหน่วยงาน',
    path: 'staff-management',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'ทะเบียนหนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'กิจกกรมพัฒนาตนเอง (หนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต)',
    path: 'activity',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'รายงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'รายชื่อเจ้าหน้าที่ใช้งาน',
    path: '',
  },
];
