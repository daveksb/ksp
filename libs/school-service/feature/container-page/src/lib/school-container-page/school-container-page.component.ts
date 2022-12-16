import { Component, OnInit } from '@angular/core';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import { MenuConfig } from '@ksp/shared/interface';

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
    path: '/temp-license/list',
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
        path: '/temp-license/request',
        params: { subtype: SchoolRequestSubType.ครู },
      },
      {
        label:
          'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ผู้บริหารสถานศึกษา)',
        path: '/temp-license/request',
        params: { subtype: SchoolRequestSubType.ผู้บริหารสถานศึกษา },
      },
      {
        label:
          'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวต่างชาติ)',
        path: '/temp-license/request',
        params: { subtype: SchoolRequestSubType.ชาวต่างชาติ },
      },
      {
        label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับครูชาวต่างชาติ',
        path: '/foreign-teacher/id-request',
      },
      {
        label: 'ขอหนังสือรับรองคุณวุฒิ',
        path: '',
        subMenuName: 'qualificationRequest',
        subMenu: [
          {
            label: 'ครู',
            path: '/qualification-approve/detail',
            params: { subtype: 1 },
          },
          {
            label: 'ผู้บริหารสถานศึกษา',
            path: '/qualification-approve/detail',
            params: { subtype: 2 },
          },
          {
            label: 'ผู้บริหารการศึกษา',
            path: '/qualification-approve/detail',
            params: { subtype: 3 },
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/qualification-approve/detail',
            params: { subtype: 4 },
          },
        ],
      },
      {
        label:
          'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI)',
        path: '/request-reward/detail',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'ทะเบียนบุคลากรภายในหน่วยงาน',
    path: '/staff-management/list',
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'ทะเบียนหนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต',
    path: '/temp-license-register/list',
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'กิจกกรมพัฒนาตนเอง (หนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต)',
    path: '/activity/list',
  },
  {
    icon: 'assets/images/icon-sidenav/file-earmark-text-fill.svg',
    label: 'รายงาน',
    path: '/temp-license/**',
  },
  {
    icon: 'assets/images/icon-sidenav/gear-fill.svg',
    label: 'ข้อมูลโรงเรียน/สถานศึกษา',
    path: '/school-info/detail',
  },
];
