import { SchRequestProcess } from '@ksp/shared/interface';

// ใช้ อ้างอิง tab ในหน้าใบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง
export enum RequestPageType {
  educationTab = 'educationTab',
  teachingTab = 'teachingTab',
  reasonTab = 'reasonTab',
  fileAttachTab = 'fileAttachTab',
  imageTab = 'imageTab',
}

export const SchoolRequestType = [
  { id: 1, name: 'ขอยื่นผู้ประสานงาน' },
  { id: 2, name: 'ขอยื่นถอดถอนผู้ประสานงาน' },
  { id: 3, name: 'ขออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ' },
  { id: 4, name: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับชาวต่างชาติ' },
  { id: 5, name: 'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ ไม่มีใบอนุญาต' },
  { id: 6, name: 'ขอรับรองคุณวุฒิทางการศึกษา' },
  { id: 40, name: 'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม' },
];

export const SchoolRetireReason = [
  { id: 1, name: 'เลิกจ้าง' },
  { id: 2, name: 'อื่นๆ' },
];

// url params keep in db for temp license request
export enum SchoolRequestSubType {
  'ครู' = 1,
  'ผู้บริหารสถานศึกษา' = 2,
  'ผู้บริหารการศึกษา' = 3,
  'ศึกษานิเทศก์' = 4,
  'ชาวต่างชาติ' = 5,
}

export const SchoolLangMapping: { [key: string]: string } = {
  ครู: 'teacher',
  ผู้บริหารสถานศึกษา: 'school administrators',
  อื่นๆ: 'other',
};
export enum UserInfoFormType {
  'thai',
  'foreign',
}

export const careerTypeList = [
  {
    systemId: 2,
    id: 1,
    name: 'ครู',
  },
  {
    systemId: 2,
    id: 2,
    name: 'ผู้บริหารสถานศึกษา',
  },
  {
    systemId: 2,
    id: 5,
    name: 'ชาวต่างชาติ',
  },
];

export const qualificationCareerTypeList = [
  {
    systemId: 2,
    id: 1,
    name: 'ครู',
  },
  {
    systemId: 2,
    id: 2,
    name: 'ผู้บริหารสถานศึกษา',
  },
  {
    systemId: 2,
    id: 3,
    name: 'ผู้บริหารการศึกษา',
  },
  {
    systemId: 2,
    id: 4,
    name: 'ศึกษานิเทศก์',
  },
];

export const SchoolRequestProcess: SchRequestProcess[] = [
  //ลงทะเบียนผู้ประสานงาน
  {
    requestType: 1,
    processId: 1,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'รอการตรวจสอบ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 3, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
    ],
  },

  //ขอถอดถอนผู้ประสานงาน
  {
    requestType: 2,
    processId: 1,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'รอการตรวจสอบ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 3, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
    ],
  },

  //ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ
  {
    requestType: 3,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 3, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 3,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 3,
    processId: 3,
    processName: 'ตรวจสอบเอกสาร ลำดับที่ 1',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: 'ปรับแก้ไข/เพิ่มเติม' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: 'ส่งคืนและยกเลิก' },
    ],
  },
  {
    requestType: 3,
    processId: 4,
    processName: 'ตรวจสอบเอกสาร ลำดับที่ 2',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: 'ปรับแก้ไข/เพิ่มเติม' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: 'ส่งคืนและยกเลิก' },
    ],
  },
  {
    requestType: 3,
    processId: 5,
    processName: 'พิจาณาและรับรอง',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการรับรอง/พิจารณา', ename: 'ผ่านการรับรอง/พิจารณา' },
      {
        id: 3,
        sname: 'ไม่ผ่านการรับรอง/พิจารณา',
        ename: 'ไม่ผ่านการรับรอง/พิจารณา',
      },
    ],
  },

  //   ขอสร้างเลขคุรุสภาสำหรับครูชาวต่างชาติ
  {
    requestType: 4,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 4,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 3, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
    ],
  },

  //ขอหนังสือรับรองคุณวุฒิการศึกษา
  {
    requestType: 6,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 6,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: 'ปรับแก้ไข/เพิ่มเติม' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: 'ส่งคืนและยกเลิก' },
    ],
  },
  {
    requestType: 6,
    processId: 3,
    processName: 'พิจาณาและรับรอง',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'รับรอง', ename: 'รับรอง' },
      { id: 3, sname: 'ไม่รับรอง', ename: 'ไม่รับรอง' },
      { id: 4, sname: 'ไม่พิจารณา', ename: 'ไม่พิจารณา' },
      { id: 5, sname: 'ยืนยันผลการตรวจสอบ', ename: 'ยืนยันผลการตรวจสอบ' },
      { id: 6, sname: 'ไม่ยืนยันผลการตรวจสอบ', ename: 'ไม่ยืนยันผลการตรวจสอบ' },
    ],
  },

  //ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม
  {
    requestType: 40,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 40,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 40,
    processId: 3,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: 'ปรับแก้ไข/เพิ่มเติม' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: 'ส่งคืนและยกเลิก' },
      { id: 6, sname: 'คัดค้าน/เพิกถอน', ename: 'คัดค้าน/เพิกถอน' },
    ],
  },
  {
    requestType: 40,
    processId: 4,
    processName: 'พิจาณาและรับรอง',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการพิจารณา', ename: 'ผ่านการพิจารณา' },
      { id: 3, sname: 'ไม่ผ่านการพิจารณา', ename: 'ไม่ผ่านการพิจารณา' },
      { id: 4, sname: 'คัดค้าน/เพิกถอน', ename: 'คัดค้าน/เพิกถอน' },
    ],
  },
];

export const levels = [
  { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', value: 'level6' },
  { label: 'ชั้นมัธยมปีที่ 1-3', value: 'level4' },
  { label: 'ชั้นประถมปีที่ 1-3', value: 'level2' },
  { label: 'อนุบาล / ปฐมวัย', value: 'level1' },
  {
    label: 'ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.) / อนุปริญญา',
    value: 'level7',
  },
  { label: 'ชั้นมัธยมปีที่ 4-6', value: 'level5' },
  { label: 'ชั้นประถมปีที่ 4-6', value: 'level3' },
];

export const subjects = [
  { label: 'ภาษาไทย', value: 's1' },
  { label: 'วิทยาศาสตร์', value: 's2' },
  { label: 'คณิตศาสตร์', value: 's3' },
  { label: 'ภาษาต่างประเทศ', value: 's4' },
  { label: 'ปฐมวัย', value: 's5' },
  {
    label: 'เทคโนโลยีสารสนเทศและการสื่อสาร',
    value: 's6',
  },
  { label: 'สุขศึกษาและพละศึกษา', value: 's7' },
  { label: 'คหกรรม', value: 's8' },
  { label: 'พาณิชยกรรม/บริหารธุรกิจ', value: 's9' },
  {
    label: 'สังคมศึกษา ศาสนาและวัฒนธรรม',
    value: 's10',
  },
  { label: 'ศิลปกรรม', value: 's11' },
  { label: 'อุตสาหกรรม', value: 's12' },
  { label: 'การงานอาชีพและเทคโนโลยี', value: 's13' },
  { label: 'เกษตรกรรม', value: 's14' },
  { label: 'อุตสาหกรรมสิ่งทอ', value: 's15' },
  { label: 'อื่นๆ', value: 's18' },
  { label: 'ประมง', value: 's16' },
  { label: 'อุตสาหกรรมท่องเที่ยว', value: 's17' },
];

export const SchoolSelfDevelopActivityTies = [
  {
    value: 0,
    label: `มีวุฒิเพิ่มขึ้นในสาขาที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา`,
  },
  {
    value: 1,
    label: `เข้ารับการอบรมและได้รับวุฒิบัตรแสดงความชำนาญการในการประกอบวิชาชีพจากคุรุสภา`,
  },
  {
    value: 2,
    label: `ผ่านการอบรมหลักสูตรที่เกี่ยวข้องกับการปฏิบัติงานในหน้าที่`,
  },
  {
    value: 3,
    label: `ได้เลื่อนวิทยฐานะ หรืออยู่ระหว่างการพิจารณาประเมินให้มีหรือเลื่อนวิทยฐานะ`,
  },
  {
    value: 4,
    label: `เป็นวิทยากรที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
  {
    value: 5,
    label: `เขียนตำรา หรือบทความ หรือผลงานทางวิชาการที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
  {
    value: 6,
    label: `สร้างนวัตกรรมที่ใช้ในการจัดการเรียนรู้หรือที่เป็นประโยชน์ต่อการศึกษา`,
  },
  {
    value: 7,
    label: `ทำวิจัยที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา `,
  },
  {
    value: 8,
    label: `ได้รับรางวัลจากคุรุสภาหรือของหน่วยงานทางการศึกษาอื่น`,
  },
  {
    value: 9,
    label: `เข้าฟังการบรรยาย อภิปราย ประชุมปฏิบัติการ ประชุมสัมมนา หรืออื่นๆ โดยมีการลงทะเบียนและมีหลักฐาน
    แสดงการเข้าร่วมกิจกรรมดังกล่าว`,
  },
  {
    value: 10,
    label: `ศึกษาดูงานที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา`,
  },
  {
    value: 11,
    label: `จัดทำผลงานหรือกิจกรรมที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
];

export const uniPermissionList = [
  {
    value: 1,
    label: 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา',
  },
  {
    value: 2,
    label:
      'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา)',
  },
];

export const staffLicenseTypes = [
  {
    value: 1,
    label: 'ใบอนุญาตประกอบวิชาชีพครู',
  },
  {
    value: 2,
    label: 'ใบอนุญาตประกอบวิชาชีพผู้บริหารสถานศึกษา',
  },
  {
    value: 3,
    label: 'ใบอนุญาตประกอบวิชาชีพผู้บริหารการศึกษา',
  },
  {
    value: 4,
    label: 'ใบอนุญาตประกอบวิชาชีพศึกษานิเทศก์',
  },
  {
    value: 5,
    label: 'ใบอนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพครู',
  },
  {
    value: 6,
    label:
      'ใบอนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพผู้บริหารสถานศึกษา',
  },
  {
    value: 7,
    label: 'ใบปฏิบัติการสอน',
  },
];

export const ThaiNumberMapping: { [key: number]: string } = {
  1: '๑',
  2: '๒',
  3: '๓',
  4: '๔',
  5: '๕',
  6: '๖',
  7: '๗',
  8: '๘',
  9: '๙',
  0: '๐',
};

export const EnglishMonthMapping: { [key: string]: string } = {
  มกราคม: 'January',
  กุมภาพันธ์: 'February',
  มีนาคม: 'March',
  เมษายน: 'April',
  พฤษภาคม: 'May',
  มิถุนายน: 'June',
  กรกฎาคม: 'July',
  สิงหาคม: 'August',
  กันยายน: 'September',
  ตุลาคม: 'October',
  พฤศจิกายน: 'November',
  ธันวาคม: 'December',
};
