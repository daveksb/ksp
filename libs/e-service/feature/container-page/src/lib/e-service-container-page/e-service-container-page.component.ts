import { Component } from '@angular/core';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

export const licenseMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวไทย)',
    path: '',
    isExpanded: true,
    subMenuName: '',
    subMenu: [
      {
        path: 'temp-license/list',
        label: 'รายการใบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
      },
      {
        path: 'dd',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวต่างชาติ)',
    path: '',
    isExpanded: true,
    subMenuName: '',
    subMenu: [
      {
        path: 'bb',
        label: 'รายการใบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
      },
      {
        path: 'aa',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ)',
    path: '',
    isExpanded: true,
    subMenuName: '',
    subMenu: [
      {
        path: 'bb',
        label: 'รายการใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
      {
        path: 'aa',
        label: 'พิจารณาเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
    ],
  },
];

@Component({
  selector: 'ksp-e-service-container-page',
  templateUrl: './e-service-container-page.component.html',
  styleUrls: ['./e-service-container-page.component.css'],
})
export class EServiceContainerPageComponent {
  menuConfig: MenuConfig[];

  constructor() {
    this.menuConfig = licenseMenu /* [
      {
        icon: 'assets/images/icon-sidenav/home.svg ',
        label: 'ข้อมูลการกล่าวหา/กล่าวโทษ',
        path: '',
        isExpanded: true,
        subMenuName: 'accusation',
        subMenu: [
          {
            path: 'record',
            label: 'บันทีกการกล่าวหา/กล่าวโทษ',
          },
          {
            path: 'investigation',
            label: 'บันทีกการสืบสวนข้อเท็จจริง',
          },
          {
            path: 'inquiry',
            label: 'บันทีกการสอบสวน',
          },
        ],
      },
      {
        icon: 'assets/images/icon-sidenav/paper.svg',
        label: 'ตรวจสอบและเผยแพร่คำวินิจฉัยชี้ขาด',
        path: '',
        subMenuName: 'verdict',
      },
      {
        icon: 'assets/images/icon-sidenav/card.svg',
        label: 'ข้อมูลทะเบียนใบอนุญาต',
        path: '',
        isExpanded: true,
        subMenuName: 'certInfo',
        subMenu: [
          {
            path: 'temp-license/list',
            label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวไทย)',
          },
          {
            path: 'foreign-license/list',
            label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับครูชาวต่างชาติ',
          },
        ],
      },

      {
        icon: 'assets/images/icon-sidenav/card.svg',
        label: 'รายงาน',
        path: '',
        isExpanded: true,
        subMenuName: 'report',
        subMenu: [
          {
            path: 'record',
            label: 'รายงานสถิติการกล่าวหา/กล่าวโทษ',
          },
          {
            path: 'investigation',
            label: 'รายงานสถิติการสืบสวน',
          },
          {
            path: 'inquiry',
            label: 'รายงานสถิติการสอบสวน',
          },
        ],
      },
    ] */;
  }
}
