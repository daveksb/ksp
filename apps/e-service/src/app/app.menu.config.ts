import { DegreeCertProcessType } from '@ksp/shared/interface';
import { MenuConfig } from '@ksp/shared/menu';

export const ethicsMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'การกล่าวหา/กล่าวโทษ',
    path: '',
    isExpanded: false,
    subMenuName: 'ethics',
    subMenu: [
      {
        path: 'accusation',
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
    path: 'publish/list',
    subMenuName: 'publish',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '',
    isExpanded: false,
    subMenuName: 'report',
    subMenu: [
      {
        path: 'accusation',
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
    isExpanded: false,
    subMenuName: 'degree-cert',
    subMenu: [
      {
        path: `degree-cert/list/${DegreeCertProcessType.check}`,
        label: 'รายการใบคำขอรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: `degree-cert/list/${DegreeCertProcessType.consider}`,
        label: 'ประเมินหลักสูตรและโครงสร้างหลักสูตร',
      },
      {
        path: `degree-cert/list/${DegreeCertProcessType.approve}`,
        label: 'พิจารณาและออกใบรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: `degree-cert/final-result`,
        label: '**ขั้นตอนสุดท้าย',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอส่งรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
    path: '',
    isExpanded: false,
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
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต (ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'temp-thai',
    subMenu: [
      {
        path: 'temp-license/list',
        label: 'รายการใบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
      },
      {
        path: 'temp-license/approve-list',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
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
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'foreign-id',
    subMenu: [
      {
        path: 'foreign-license/list',
        label: 'รายการใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
      {
        path: 'foreign-license/detail',
        label: 'พิจารณาเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรหัสเข้าใช้งานระบบบริหารหน่วยงานทางการศึกษา (School Service)',
    path: 'approve-new-user',
    isExpanded: false,
  },
  {
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'บริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-management',
    subMenu: [
      {
        path: 'manage-current-user',
        label: 'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
      },
    ],
  },
];
