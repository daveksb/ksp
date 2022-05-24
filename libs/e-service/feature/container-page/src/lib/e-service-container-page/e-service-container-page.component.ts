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
            label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวต่างชาติ)',
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
    ];
  }
}
