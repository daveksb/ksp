import { MenuConfig } from '@ksp/shared/ui/side-menu';

export const ethicsMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'การกล่าวหา/กล่าวโทษ',
    path: '',
    isExpanded: true,
    subMenuName: 'accusation',
    subMenu: [
      {
        path: 'ethics/accusation',
        label: 'บันทีกการกล่าวหา/กล่าวโทษ',
      },
      {
        path: 'ethics/investigation',
        label: 'บันทีกการสืบสวนข้อเท็จจริง',
      },
      {
        path: 'ethics/inquiry',
        label: 'บันทีกการสอบสวน',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ตรวจสอบและเผยแพร่คำวินิจฉัยชี้ขาด',
    path: 'ethics/verdict',
    subMenuName: 'verdict',
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

export const standardMenu: MenuConfig[] = [];

export const licenseMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวไทย)',
    path: '',
    isExpanded: true,
    subMenuName: 'temp-thai',
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
    isExpanded: false,
    subMenuName: 'temp-foreign',
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
    isExpanded: false,
    subMenuName: 'foreign-id',
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
