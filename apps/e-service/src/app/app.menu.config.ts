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
    path: 'ethics/publish',
    subMenuName: 'publish',
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

export const standardMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรองปริญญาและประกาศนียบัตร',
    path: '',
    isExpanded: true,
    subMenuName: 'degree-cert',
    subMenu: [
      {
        path: 'degree-cert/list/1',
        label: 'รายการใบคำขอรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: 'degree-cert/list/2',
        label: 'ประเมินหลักสูตรและโครงสร้างหลักสูตร',
      },
      {
        path: 'degree-cert/list/3',
        label: 'พิจารณาและออกใบรับรองปริญญาและประกาศนียบัตร',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอส่งรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
    path: '',
    isExpanded: true,
    subMenuName: 'gradute-list',
    subMenu: [
      {
        path: 'aa',
        label: 'รายการใบคำขอส่งรายชื่อผู้เข้าศึกษา',
      },
      {
        path: 'bb',
        label: 'รายการใบคำขอส่งรายชื่อผู้สำเร็จการศึกษา',
      },
      {
        path: 'cc',
        label: 'พิจารณารับข้อมูลผู้เข้าและผู้สำเร็จการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอเทียบโอนความรู้',
    path: '',
    isExpanded: false,
    subMenuName: '--',
    subMenu: [],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรองคุณวุฒิทางการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: '--',
    subMenu: [],
  },
];

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
        path: 'temp-license/approve',
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
