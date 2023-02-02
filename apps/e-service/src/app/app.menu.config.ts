import { MenuConfig } from '@ksp/shared/interface';

//หนังสืออนุญาตต่างๆ
export const eLicenseMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอรับหนังสืออนุญาตประกอบวิชาชีพ(ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'license',
    subMenu: [
      {
        path: '/request-license/approve-list',
        label: 'รายการแบบคำขอรับหนังสืออนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/request-license/search-list',
        label: 'จัดทำบัญชีรายชื่อและนำเสนอขอหนังสืออนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/request-license/guarantee',
        label: 'รับรองหนังสืออนุญาตประกอบวิชาขีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอรับหนังสืออนุญาตประกอบวิชาชีพ(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'request-foreign-license',
    subMenu: [
      {
        path: '/request-foreign-license/list',
        label: 'รายการแบบคำขอรับหนังสืออนุญาตประกอบวิชาชีพ',
      },
      /* {
        path: '/xxx',
        label: 'บัญชีรายชื่อและผลการนำเสนอขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ',
      }, */
      {
        path: '/xxx',
        label: 'พิจารณารับรองหนังสืออนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'สร้างเลขหนังสืออนุญาตประกอบวิชาชีพ',
    path: '/create-license-id/list',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ(ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'renewThai',
    subMenu: [
      {
        path: '/renew-license/approve-list',
        label: 'รายการแบบคำขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/renew-license/search-list',
        label: 'จัดทำบัญชีรายชื่อและนำเสนอขอหนังสืออนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/renew-license/guarantee',
        label: 'รับรองหนังสืออนุญาตประกอบวิชาขีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'renewForeign',
    subMenu: [
      {
        path: '/renew-foreign-license/list',
        label: 'รายการแบบคำขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ',
      },
      /* {
        path: '/xxx',
        label: 'บัญชีรายชื่อและผลการนำเสนอขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ',
      }, */
      {
        path: '/xxx',
        label: 'พิจารณารับรองหนังสืออนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีหนังสืออนุญาต(ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'tempThai',
    subMenu: [
      {
        path: '/temp-license/list/1',
        label:
          'รายการแบบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีหนังสืออนุญาต',
      },
      {
        path: '/temp-license/consider-list/1',
        label:
          'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีหนังสืออนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label:
      'แบบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีหนังสืออนุญาต(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'tempForeign',
    subMenu: [
      {
        path: '/temp-license/list/5',
        label:
          'รายการแบบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีหนังสืออนุญาต',
      },
      {
        path: '/temp-license/consider-list/5',
        label:
          'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีหนังสืออนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอเปลี่ยนแปลง/แก้ไขหนังสืออนุญาต',
    path: '',
    isExpanded: false,
    subMenuName: 'edit-thai',
    subMenu: [
      {
        path: '/edit-license/list',
        label: 'รายการแบบคำขอแก้ไข/เปลี่ยนแปลงหนังสืออนุญาต',
      },
      {
        path: '/edit-license/consider-list',
        label: 'พิจารณาขอเปลี่ยนแปลง/แก้หนังสืออนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'sub-license',
    subMenu: [
      {
        path: '/sub-license/approve-list',
        label: 'รายการแบบคำขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/xxx',
        label: 'พิจารณาขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
    path: '',
    isExpanded: false,
    subMenuName: 'foreign-id',
    subMenu: [
      {
        path: '/foreign-license/list',
        label: 'รายการใบคำเลขคุรุสภาสำหรับชาวต่างชาติ',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'กิจกรรมพัฒนาตนเอง',
    path: '',
    isExpanded: false,
    subMenuName: 'activities',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการแบบคำขอยื่นกรอกกิจกรรมพัฒนาตนเอง',
      },
      {
        path: '/xxx',
        label: 'พิจารณากิจกรรมพัฒนาตนเอง',
      },
    ],
  }, */
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ข้อมูลลักษณะต้องห้ามของผู้ขอหนังสืออนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'forbidden',
    subMenu: [
      {
        path: '/xxx',
        label: 'บันทึกข้อมูลลักษณะต้องห้ามของผู้ขอรับหนังสืออนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/xxx',
        label: 'พิจารณาข้อมูลลักษณะต้องห้ามของผู้ขอรับหนังสืออนุญาตประกอบวิชาชีพ',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '/xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'งานรับ-ส่งเอกสารหนังสืออนุญาต',
    path: '',
    isExpanded: false,
    subMenuName: 'document',
    subMenu: [
      {
        path: '/document-delivery/receive-list',
        label: 'รายการรับ-ส่งเอกสารหนังสืออนุญาต',
      },
      {
        path: '/document-delivery/check-list',
        label: 'ตรวจสอบสถานะเอกสารส่งออก',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '/xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอผู้ใช้งานระบบบริการตนเอง (Self Service) สำหรับชาวต่างชาติ',
    path: '/self-user/new-user-list',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
    path: '/school/new-user',
  },
  {
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'บริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-management',
    subMenu: [
      {
        path: '/xxx',
        label: 'ผู้ใช้งานระบบบริการด้วยตนเอง (self Service)',
      },
      {
        path: '/school/current-user',
        label: 'ผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
      },
    ],
  },
];

export const ethicsMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'การกล่าวหา/กล่าวโทษ',
    path: '',
    isExpanded: false,
    subMenuName: 'ethics',
    subMenu: [
      {
        path: '/accusation',
        label: 'บันทีกการกล่าวหา/กล่าวโทษ',
      },
      {
        path: '/investigation',
        label: 'บันทีกการสืบสวนข้อเท็จจริง',
      },
      {
        path: '/inquiry',
        label: 'บันทีกการสอบสวน',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'เผยแพร่การกล่าวหา/กล่าวโทษ',
    path: '/publish/list',
    subMenuName: 'publish',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'รายงาน',
    path: '/xxx',
  },
];

export const standardMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรองปริญญาและประกาศนียบัตร',
    path: '',
    isExpanded: false,
    subMenuName: 'degree-cert',
    subMenu: [
      {
        path: `/degree-cert/list/1/0`,
        label: 'รายการแบบคำขอรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: `/degree-cert/list/3/1`,
        label: 'ประเมินหลักสูตรและโครงสร้างหลักสูตร',
      },
      {
        path: `/degree-cert/list/4/2`,
        label: 'พิจารณาและออกใบรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: `/degree-cert/list/6/3`,
        label: 'ติดตามผลเชิงประจักษ์',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอส่งรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: 'gradute-list',
    subMenu: [
      {
        path: '/degree-cert/list-approved',
        label: 'รายการแบบคำขอส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
      },
      // {
      //   path: '/cc',
      //   label: 'พิจารณารับข้อมูลผู้เข้าและผู้สำเร็จการศึกษา',
      // },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอเทียบโอนความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'transfer-knowledge',
    subMenu: [
      {
        path: '/aa',
        label: 'รายการแบบคำขอเทียบโอนความรู้',
      },
      {
        path: '/bb',
        label: 'บัญชีรายชื่อและนำเสนอขอเทียบโอนความรู้',
      },
      {
        path: '/cc',
        label: 'พิจารณารับรองและพิมพ์วุฒิบัตร',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอเทียบเคียงความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'compare',
    subMenu: [
      {
        path: '/compare-knowledge/list',
        label: 'รายการแบบคำขอเทียบเคียงความรู้',
      },
      {
        path: '/xxx',
        label: 'บัญชีรายชื่อและพิมพ์หนังสือเทียบเคียงความรู้',
      },
      {
        path: '/xxx',
        label: 'พิจารณารับรองเทียบเคียงความรู้',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'แบบคำขอรับรองความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'knowledge',
    subMenu: [
      {
        path: '/knowledge-cert/list',
        label: 'รายการแบบคำขอรับรองความรู้',
      },
      {
        path: '/xxx',
        label: 'บัญชีรายชื่อและพิมพ์หนังสือรับรองความรู้',
      },
      {
        path: '/xxx',
        label: 'พิจารณารับรองรับรองความรู้',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรองคุณวุฒิทางการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: 'qualification',
    subMenu: [
      {
        path: '/qualification-approve/list',
        label: 'รายการใบคำรับรองคุณวุฒิทางการศึกษา',
      },
      {
        path: '/qualification-approve/consider-list',
        label: 'พิจารณารับรองคุณวุฒิทางการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกผลการทดสอบ',
    path: '/import-test/list',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกผลการประเมินสมรรถนะทางวิชาชีพครู',
    path: '/import-performance/list',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '/xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '/xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรหัสเข้าใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
    path: '/uni/new-user',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ระบบบริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-management',
    subMenu: [
      {
        path: '/uni/current-user',
        label: 'ผู้ใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
      },
    ],
  },
];

export const professionalMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลคุรุสภา',
    path: '',
    subMenuName: 'reward1',
    subMenu: [
      {
        path: '/teacher-council/list',
        label: 'รายการแบบคำขอรับรางวัลคุรุสภา',
      },
      {
        path: '/teacher-council/account-list',
        label: 'จัดทำบัญชีรายชื่อ',
      },
      {
        path: '/teacher-council/check-list',
        label: 'เจ้าหน้าที่ส่วนกลางตรวจสอบบันทึกผล',
      },
      {
        path: '/teacher-council/declare',
        label: 'ประกาศรายชื่อ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลครูภาษาไทยดีเด่น',
    path: '',
    subMenuName: 'reward2',
    subMenu: [
      {
        path: '/thai-teacher/list',
        label: 'รายการแบบคำขอรับรางวัลครูภาษาไทยดีเด่น',
      },
      {
        path: '/thai-teacher/account-list',
        label: 'จัดทำบัญชีรายชื่อ',
      },
      {
        path: '/thai-teacher/check-list',
        label: 'เจ้าหน้าที่ส่วนกลางตรวจสอบบันทึกผล',
      },
      {
        path: '/thai-teacher/declare',
        label: 'ประกาศรายชื่อ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลครูผู้สอนดีเด่น',
    path: '',
    subMenuName: 'reward3',
    subMenu: [
      {
        path: '/best-teacher/list',
        label: 'รายการแบบคำขอรับรางวัลครูผู้สอนดีเด่น',
      },
      {
        path: '/best-teacher/account-list',
        label: 'จัดทำบัญชีรายชื่อ',
      },
      {
        path: '/best-teacher/check-list',
        label: 'เจ้าหน้าที่ส่วนกลางตรวจสอบบันทึกผล',
      },
      {
        path: '/best-teacher/declare',
        label: 'ประกาศรายชื่อ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลคุรุสดุดี',
    path: '',
    subMenuName: 'reward4',
    subMenu: [
      {
        path: '/praise-teacher/list',
        label: 'รายการแบบคำขอรับรางวัลคุรุสดุดี',
      },
      {
        path: '/praise-teacher/account-list',
        label: 'จัดทำบัญชีรายชื่อ',
      },
      {
        path: '/praise-teacher/check-list',
        label: 'เจ้าหน้าที่ส่วนกลางตรวจสอบบันทึกผล',
      },
      {
        path: '/praise-teacher/declare',
        label: 'ประกาศรายชื่อ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลผลงานวิจัยของคุรุสภา',
    path: '',
    subMenuName: 'reward5',
    subMenu: [
      {
        path: '/research-reward/list',
        label: 'รายการแบบคำขอรับรางวัลผลงานวิจัยของคุรุสภา',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลผลงานวิจัยของคุรุสภา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลครูอาวุโส',
    path: '',
    subMenuName: 'reward6',
    subMenu: [
      {
        path: '/senior-teacher/list',
        label: 'รายการแบบคำขอรับรางวัลครูอาวุโส',
      },
      {
        path: '/senior-teacher/account-list',
        label: 'สร้างบัญชีรายชื่อนำเสนอส่วนกลาง (มอ.5)',
      },
      {
        path: '/senior-teacher/check-list',
        label: 'เจ้าหน้าที่ส่วนกลางตรวจสอบบันทึกผล',
      },
      {
        path: '/senior-teacher/report-account-list',
        label: 'เจ้าหน้าที่ส่วนกลางจัดทำบัญชีผู้เข้ารายงานตัว',
      },
      {
        path: '/senior-teacher/report-list',
        label: 'ลงทะเบียนรายงานตัว',
      },
      {
        path: '/senior-teacher/print-list',
        label: 'พิมพ์ป้ายติดหน้าอก',
      },
      {
        path: '/senior-teacher/visit-list',
        label: 'ลงทะเบียนวันเข้าเฝ้าฯ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'แบบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
    path: '',
    isExpanded: false,
    subMenuName: 'osoi',
    subMenu: [
      {
        path: '/one-school-one-innovation/list',
        label: 'รายการแบบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
      {
        path: '/one-school-one-innovation/ranking-list',
        label: 'พิจารณารางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'รายงาน',
    path: '/xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ตั้งค่า',
    path: '',
    isExpanded: false,
    subMenuName: 'enable-reward',
    subMenu: [
      {
        path: '/enable-reward/list',
        label: 'ตั้งค่าเปิด-ปิดยื่นขอรับรางวัล',
      },
    ],
  },
];

export const refundFeeMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    path: '/payment-fee/all-payment',
    label: 'รายการชำระเงิน',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายการชำระเงินค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'pay',
    subMenu: [
      {
        path: '/payment-fee/list',
        label: 'รายการใบเสร็จรับเงิน',
      },
      {
        path: '/payment-fee/receive',
        label: 'รายการรับเงินค่าธรรมเนียม',
      },
      {
        path: '/payment-fee/remittance',
        label: 'รายการใบนำส่งเงิน',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายการขอคืนเงินค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'refund',
    subMenu: [
      {
        path: '/refund-fee/list',
        label: 'รายการแบบคำขอคืนค่าธรรมเนียม',
      },
      {
        path: '/refund-fee/create-roster',
        label: 'บัญชีรายชื่อและอนุมัติการคืนค่าธรรมเนียม',
      },
      {
        path: '/xxx',
        label: 'ตรวจสอบและบันทึกสถานะการคืนค่าธรรมเนียม',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'นำเข้าและบันทึกค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'import',
    subMenu: [
      {
        path: '/xxx',
        label: 'นำเข้าและบันทึก (ธนาคารกรุงไทย)',
      },
      {
        path: '/xxx',
        label: 'นำเข้าและบันทึก (Counter Service) ',
      },
      {
        path: '/xxx',
        label: 'นำเข้าและบันทึก (ไปรษณีย์ไทย) ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'รายงาน',
    path: '/xxx',
  },
];
