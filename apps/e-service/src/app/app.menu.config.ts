import { DegreeCertProcessType } from '@ksp/shared/constant';
import {
  MenuConfig,
  tempLicenseRequestType,
} from '@ksp/shared/interface';

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
        path: `degree-cert/list///${DegreeCertProcessType.check}`,
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
    subMenuName: 'request-knowledge',
    subMenu: [
      {
        path: 'aa',
        label: 'รายการใบคำขอเทียบโอนความรู้',
      },
      {
        path: 'bb',
        label: 'บัญชีรายชื่อและนำเสนอขอเทียบโอนความรู้',
      },
      {
        path: 'cc',
        label: 'พิจารณารับรองและพิมพ์วุฒิบัตร',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรองคุณวุฒิทางการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: 'request-degree',
    subMenu: [
      {
        path: 'aa',
        label: 'รายการใบคำรับรองคุณวุฒิทางการศึกษา',
      },
      {
        path: 'bb',
        label: 'พิจารณารับรองคุณวุฒิทางการศึกษา',
      },
      {
        path: 'cc',
        label: 'บัญชีรายชื่อและพิมพ์หนังสือคุณวุฒิทางการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกผลการทดสอบ',
    path: 'import-test',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกผลการประเมินสมรรถนะทางวิชาชีพครู',
    path: 'import-performance',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '',
    isExpanded: false,
    subMenuName: 'data',
    subMenu: [
      {
        path: 'aa',
        label: 'ทะเบียนรหัสรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: 'bb',
        label: 'ทะเบียนรายชื่อนักศึกษาเข้าเรียนและจบการศึกษา',
      },
      {
        path: 'cc',
        label: 'ทะเบียนผู้ผ่านการทดสอบ',
      },
      {
        path: 'cc',
        label: 'ทะเบียนผู้ผ่านการประเมินสมรรถนะทางวิชาชีพครู',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '',
    isExpanded: false,
    subMenuName: 'report',
    subMenu: [
      {
        path: 'aa',
        label: 'รายงานยื่นใบคำขอ(แยกตามประเภท)',
      },
      {
        path: 'bb',
        label: ' รายงานรายชื่อปริญญาและประกาศนียบัตรที่ได้รับการรับรอง',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ระบบบริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-manage',
    subMenu: [
      {
        path: 'aa',
        label: 'ผู้ใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
      },
    ],
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
        params: { subtype: tempLicenseRequestType.thai },
      },
      {
        path: 'temp-license/approve-list',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        params: { subtype: tempLicenseRequestType.thai },
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
        path: 'temp-license/list',
        label: 'รายการใบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        params: { subtype: tempLicenseRequestType.foreign },
      },
      {
        path: 'temp-license/approve-list',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
        params: { subtype: tempLicenseRequestType.foreign },
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
    path: '',
    isExpanded: false,
    subMenuName: 'foreign-id',
    subMenu: [
      {
        path: 'foreign-license/list',
        label: 'รายการใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
      {
        path: 'xxx',
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

export const professionalMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
    path: '',
    isExpanded: false,
    subMenuName: 'professional',
    subMenu: [
      {
        path: 'one-school-one-innovation/list',
        label: 'รายการใบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
      {
        path: 'one-school-one-innovation/approve',
        label: 'พิจารณารางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
    ],
  },
];

export const refundFeeMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายการขอคืนเงินค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'professional',
    subMenu: [
      {
        path: 'refund/list',
        label: 'รายการใบขอคืนค่าธรรมเนียม',
      },
      {
        path: 'refund/detail',
        label: 'บัญชีรายชื่อและอนุมัติการคืนค่าธรรมเนียม',
      },
      {
        path: 'refund/approve',
        label: 'ตรวจสอบและบันทึกสถานะการคืนค่าธรรมเนียม',
      },
    ],
  },
];
