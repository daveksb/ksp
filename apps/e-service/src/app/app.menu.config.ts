import { MenuConfig } from '@ksp/shared/interface';

//ใบอนุญาตต่างๆ
export const eLicenseMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรับใบอนุญาตประกอบวิชาชีพ(ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'license',
    subMenu: [
      {
        path: '/request-license/approve-list',
        label: 'รายการใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/request-license/search-list',
        label: 'จัดทำบัญชีรายชื่อและนำเสนอขอใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/request-license/guarantee',
        label: 'รับรองใบอนุญาตประกอบวิชาขีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอรับใบอนุญาตประกอบวิชาชีพ(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'request-foreign-license',
    subMenu: [
      {
        path: '/request-foreign-license/list',
        label: 'รายการใบคำขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/xxx',
        label: 'พิจารณารับรองใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'สร้างเลขใบอนุญาตประกอบวิชาชีพ',
    path: '/create-license-id/list',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอต่ออายุใบอนุญาตประกอบวิชาชีพ(ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'renewThai',
    subMenu: [
      {
        path: '/renew-license/approve-list',
        label: 'รายการใบคำขอต่ออายุใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/renew-license/search-list',
        label: 'จัดทำบัญชีรายชื่อและนำเสนอขอใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/renew-license/guarantee',
        label: 'รับรองใบอนุญาตประกอบวิชาขีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอต่ออายุใบอนุญาตประกอบวิชาชีพ(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'renewForeign',
    subMenu: [
      {
        path: '/renew-foreign-license/list',
        label: 'รายการใบคำขอต่ออายุใบอนุญาตประกอบวิชาชีพ',
      },
      /* {
        path: '/xxx',
        label: 'บัญชีรายชื่อและผลการนำเสนอขอต่ออายุใบอนุญาตประกอบวิชาชีพ',
      }, */
      {
        path: '/xxx',
        label: 'พิจารณารับรองใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต(ชาวไทย)',
    path: '',
    isExpanded: false,
    subMenuName: 'tempThai',
    subMenu: [
      {
        path: '/temp-license/list/1',
        label: 'รายการใบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต',
      },
      /* {
        path: '/xxx',
        label:
          'บัญชีรายชื่อและผลการนำเสนอขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต',
      }, */
      {
        path: '/xxx',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'tempForeign',
    subMenu: [
      {
        path: '/temp-license/list/5',
        label: 'รายการใบคำขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต',
      },
      /* {
        path: '/xxx',
        label:
          'บัญชีรายชื่อและผลการนำเสนอขอหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต',
      }, */
      {
        path: '/xxx',
        label: 'พิจารณารับรองหนังสืออนุญาตให้ประกอบวิชาชีพโดยไม่มีใบอนุญาต',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเปลี่ยนแปลง/แก้ไขใบอนุญาต',
    path: '',
    isExpanded: false,
    subMenuName: 'edit-thai',
    subMenu: [
      {
        path: '/edit-license/list',
        label: 'รายการใบคำขอแก้ไข/เปลี่ยนแปลงใบอนุญาต',
      },
      {
        path: '/xxx',
        label: 'พิจารณาขอเปลี่ยนแปลง/แก้ใบอนุญาต',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเปลี่ยนแปลง/แก้ไขใบอนุญาต(ชาวต่างชาติ)',
    path: '',
    isExpanded: false,
    subMenuName: 'edit-foreign',
    subMenu: [
      {
        path: '/edit-license/list',
        label: 'รายการใบคำขอแก้ไข/เปลี่ยนแปลงใบอนุญาต',
      },
      {
        path: '/xxx',
        label: 'พิจารณาขอเปลี่ยนแปลง/แก้ใบอนุญาต',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอใบแทนใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'sub-license',
    subMenu: [
      {
        path: '/sub-license/approve-list',
        label: 'รายการใบคำขอใบแทนใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/xxx',
        label: 'พิจารณาขอใบแทนใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  /* {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอหนังสือรับรองความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'knowledge',
    subMenu: [
      {
        path: '/knowledge-cert/list',
        label: 'รายการใบคำขอหนังสือรับรองความรู้',
      },
      {
        path: '/xxx',
        label: 'พิจารณาหนังสือรับรองความรู้',
      },
    ],
  }, */
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเลขคุรุสภาสำหรับชาวต่างชาติ',
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

  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'กิจกรรมพัฒนาตนเอง',
    path: '',
    isExpanded: false,
    subMenuName: 'activities',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการใบคำขอยื่นกรอกกิจกรรมพัฒนาตนเอง',
      },
      {
        path: '/xxx',
        label: 'พิจารณากิจกรรมพัฒนาตนเอง',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ข้อมูลลักษณะต้องห้ามของผู้ขอใบอนุญาตประกอบวิชาชีพ',
    path: '',
    isExpanded: false,
    subMenuName: 'forbidden',
    subMenu: [
      {
        path: '/xxx',
        label: 'บันทึกข้อมูลลักษณะต้องห้ามของผู้ขอรับใบอนุญาตประกอบวิชาชีพ',
      },
      {
        path: '/xxx',
        label: 'พิจารณาข้อมูลลักษณะต้องห้ามของผู้ขอรับใบอนุญาตประกอบวิชาชีพ',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
    path: '/school/new-user',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '/xxx',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'งานรับ-ส่งเอกสารใบอนุญาต',
    path: '',
    isExpanded: false,
    subMenuName: 'document',
    subMenu: [
      {
        path: '/document-delivery/receive-list',
        label: 'รายการรับ-ส่งเอกสารใบอนุญาต',
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
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'บริหารจัดการผู้ใช้งาน',
    path: '',
    isExpanded: false,
    subMenuName: 'user-management',
    subMenu: [
      /* {
        path: '/school/new-user',
        label: 'ใบคำขอผู้ใช้งานระบบบริการหน่วยงานทางการศึกษา (School Service)',
      }, */
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
    path: '',
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
        path: `/degree-cert/list/1/0`,
        label: 'รายการใบคำขอรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: `/degree-cert/list/3/1`,
        label: 'ประเมินหลักสูตรและโครงสร้างหลักสูตร',
      },
      {
        path: `/degree-cert/list/1/2`,
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
        path: '/degree-cert/list-approved',
        label: 'รายการใบคำขอส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
      },
      {
        path: '/cc',
        label: 'พิจารณารับข้อมูลผู้เข้าและผู้สำเร็จการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอเทียบโอนความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'transfer-knowledge',
    subMenu: [
      {
        path: '/aa',
        label: 'รายการใบคำขอเทียบโอนความรู้',
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
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรองคุณวุฒิทางการศึกษา',
    path: '',
    isExpanded: false,
    subMenuName: 'qualification',
    subMenu: [
      {
        path: '/qualification-approve/list',
        label: 'รายการใบคำรับรองคุณวุฒิทางการศึกษา',
      },
      {
        path: '/cc',
        label: 'บัญชีรายชื่อและพิมพ์หนังสือคุณวุฒิทางการศึกษา',
      },
      {
        path: '/bb',
        label: 'พิจารณารับรองคุณวุฒิทางการศึกษา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ใบคำขอเทียบเคียงความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'compare',
    subMenu: [
      {
        path: '/compare-knowledge/list',
        label: 'รายการใบคำขอเทียบเคียงความรู้',
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
    label: 'ใบคำขอรับรองความรู้',
    path: '',
    isExpanded: false,
    subMenuName: 'knowledge',
    subMenu: [
      {
        path: '/knowledge-cert/list',
        label: 'รายการใบคำขอรับรองความรู้',
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
    label: 'ใบคำขอรหัสเข้าใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
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
        path: '/bb',
        label: 'ผู้ใช้งานระบบบริการสถาบันผลิตครู (Uni Service)',
      },
    ],
  },
];

export const professionalMenu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลคุรุสภา',
    path: '',
    subMenuName: 'reward1',
    subMenu: [
      {
        path: '/teacher-council/list',
        label: 'รายการใบคำขอรับรางวัลคุรุสภา',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลคุรุสภา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลครูภาษาไทยดีเด่น',
    path: '',
    subMenuName: 'reward2',
    subMenu: [
      {
        path: '/thai-teacher/list',
        label: 'รายการใบคำขอรับรางวัลครูภาษาไทยดีเด่น',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลครูภาษาไทยดีเด่น',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลครูผู้สอนดีเด่น',
    path: '',
    subMenuName: 'reward3',
    subMenu: [
      {
        path: '/best-teacher/list',
        label: 'รายการใบคำขอรับรางวัลครูผู้สอนดีเด่น',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลครูผู้สอนดีเด่น',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลคุรุสดุดี',
    path: '',
    subMenuName: 'reward4',
    subMenu: [
      {
        path: '/praise-teacher/list',
        label: 'รายการใบคำขอรับรางวัลคุรุสดุดี',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลคุรุสดุดี',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลผลงานวิจัยของคุรุสภา',
    path: '',
    subMenuName: 'reward5',
    subMenu: [
      {
        path: '/research-reward/list',
        label: 'รายการใบคำขอรับรางวัลผลงานวิจัยของคุรุสภา',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลผลงานวิจัยของคุรุสภา',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลครูอาวุโส',
    path: '',
    subMenuName: 'reward6',
    subMenu: [
      {
        path: '/senior-teacher/list',
        label: 'รายการใบคำขอรับรางวัลครูอาวุโส',
      },
      {
        path: '/xxx',
        label: 'พิจารณารางวัลครูอาวุโส',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ใบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
    path: '',
    isExpanded: false,
    subMenuName: 'osoi',
    subMenu: [
      {
        path: '/one-school-one-innovation/list',
        label: 'รายการใบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม',
      },
      {
        path: '/one-school-one-innovation/ranking',
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
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายการชำระเงินค่าธรรมเนียม',
    path: '',
    isExpanded: false,
    subMenuName: 'pay',
    subMenu: [
      {
        path: '/xxx',
        label: 'รายการใบเสร็จรับเงิน',
      },
      {
        path: '/xxx',
        label: 'รายการใบนำส่งเงิน',
      },
      {
        path: '/xxx',
        label: 'รายการใบประกอบใบนำส่งเงิน',
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
        path: '/refund/list',
        label: 'รายการใบขอคืนค่าธรรมเนียม',
      },
      {
        path: '/xxx',
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
    path: '',
  },
];
