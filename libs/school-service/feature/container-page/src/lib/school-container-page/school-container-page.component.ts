import { Component, OnInit } from '@angular/core';
import { MenuConfig } from '@ksp/shared/menu';

@Component({
  selector: 'school-container-page',
  templateUrl: './school-container-page.component.html',
  styleUrls: ['./school-container-page.component.css'],
})
export class SchoolContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];

  ngOnInit(): void {
    this.menuConfig = menu;
  }
}

export const menu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/home.svg ',
    label: 'หน้าแรก',
    path: 'temp-license/list',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นใบคำขอ',
    path: '',
    subMenuName: 'license',
    isExpanded: false,
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
        path: 'foreign-teacher/id-request',
      },
      {
        label: 'ขอหนังสือรับรองคุณวุฒิ',
        path: 'qualification-approve/detail',
      },
      {
        label:
          'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI)',
        path: 'request-reward/detail',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'ทะเบียนบุคลากรภายในหน่วยงาน',
    path: 'staff-management',
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'ทะเบียนหนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'กิจกกรมพัฒนาตนเอง (หนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต)',
    path: 'activity',
  },
  {
    icon: 'assets/images/icon-sidenav/file-earmark-text-fill.svg',
    label: 'รายงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/gear-fill.svg',
    label: 'รายชื่อเจ้าหน้าที่ใช้งาน',
    path: '',
  },
];
