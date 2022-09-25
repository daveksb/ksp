// ใช้ อ้างอิง tab ในหน้าใบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง
export enum RequestPageType {
  educationTab = 'educationTab',
  teachingTab = 'teachingTab',
  reasonTab = 'reasonTab',
  fileAttachTab = 'fileAttachTab',
}

export const SchoolRequestType = [
  { id: 1, name: 'ขอยื่นผู้ประสานงาน' },
  { id: 2, name: 'ขอยื่นถอดถอนผู้ประสานงาน' },
  { id: 3, name: 'ขอหนังสืออนุญาตประกอบวิชาชีพ' },
  { id: 4, name: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับชาวต่างชาติ' },
  { id: 5, name: 'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ ไม่มีใบอนุญาต' },
  { id: 6, name: 'ขอหนังสือรับรองคุณวุฒิ' },
  { id: 40, name: 'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม' },
];

export const SchoolRetireReason = [
  { id: 1, name: 'reason1' },
  { id: 2, name: 'reason2' },
  { id: 3, name: 'reason3' },
  { id: 4, name: 'reason4' },
  { id: 5, name: 'reason5' },
  { id: 6, name: 'reason6' },
];

// url params keep in db for temp license request
export enum SchoolRequestSubType {
  'ครู' = 1,
  'ผู้บริหารสถานศึกษา' = 2,
  'อื่นๆ' = 5,
}

export enum UserInfoFormType {
  'thai',
  'foreign',
}

export const EduOccupyList = [
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
    name: 'อื่นๆ',
  },
];

export interface RequestProcess {
  requestType: number;
  processId: number;
  processName: string;
  status: RequestStatus[]; //[{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
}

export interface RequestStatus {
  id: number;
  sname: string;
  ename: string;
}

export const RequestProcessList: RequestProcess[] = [
  //ลงทะเบียนผู้ประสานงาน
  {
    requestType: 1,
    processId: 1,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: '', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: '', ename: 'ผ่านการตรวจสอบ' },
      { id: 3, sname: '', ename: 'ไม่ผ่านการตรวจสอบ' },
    ],
  },

  //ขอถอดถอนผู้ประสานงาน
  {
    requestType: 2,
    processId: 1,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: '', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: '', ename: 'ผ่านการตรวจสอบ' },
      { id: 3, sname: '', ename: 'ไม่ผ่านการตรวจสอบ' },
    ],
  },

  //ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ
  {
    requestType: 3,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
      { id: 2, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 3,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 3,
    processId: 3,
    processName: 'ตรวจสอบเอกสาร ลำดับที่ 1',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: 'ปรับแก้ไข/เพิ่มเติม' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: 'ไม่ผ่านการตรวจสอบ' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: 'ส่งคืนและยกเลิก' },
      { id: 6, sname: 'ยกเลิก', ename: 'ยกเลิก' },
    ],
  },
  {
    requestType: 3,
    processId: 4,
    processName: 'ตรวจสอบเอกสาร ลำดับที่ 2',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการรับรอง/พิจารณา', ename: '' },
      { id: 3, sname: 'ไม่ผ่านการรับรอง/พิจารณา', ename: '' },
    ],
  },
  {
    requestType: 3,
    processId: 0,
    processName: 'ยกเลิก',
    status: [{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
  },

  //ขอสร้างเลขคุรุสภาสำหรับครูชาวต่างชาติ
  {
    requestType: 4,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
      { id: 2, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 4,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: '' },
      { id: 3, sname: 'ไม่ผ่านการตรวจสอบ', ename: '' },
      { id: 4, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 4,
    processId: 0,
    processName: 'ยกเลิก',
    status: [{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
  },

  //ขอหนังสือรับรองคุณวุฒิการศึกษา
  {
    requestType: 6,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
      { id: 2, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 6,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: '' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: '' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: '' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: '' },
      { id: 6, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 6,
    processId: 3,
    processName: 'พิจาณาและรับรอง',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'รับรอง', ename: '' },
      { id: 3, sname: 'ไม่รับรอง', ename: '' },
      { id: 4, sname: 'ไม่พิจารณา', ename: '' },
      { id: 5, sname: '', ename: 'ยืนยันผลการตรวจสอบ' },
      { id: 6, sname: '', ename: 'ไม่ยืนยันผลการตรวจสอบ' },
    ],
  },
  {
    requestType: 6,
    processId: 0,
    processName: 'ยกเลิก',
    status: [{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
  },

  //ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม
  {
    requestType: 40,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
      { id: 2, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 40,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
      { id: 2, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 40,
    processId: 3,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: '' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: '' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: '' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: '' },
      { id: 6, sname: 'คัดค้าน/เพิกถอน', ename: '' },
      { id: 7, sname: 'ยกเลิก', ename: '' },
    ],
  },
  {
    requestType: 40,
    processId: 4,
    processName: 'พิจาณาและรับรอง',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการพิจารณา', ename: '' },
      { id: 3, sname: 'ไม่ผ่านการพิจารณา', ename: '' },
      { id: 4, sname: 'คัดค้าน/เพิกถอน', ename: '' },
    ],
  },
  {
    requestType: 40,
    processId: 0,
    processName: 'ยกเลิก',
    status: [{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
  },
];

export const levels = [
  { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', value: 'level6' },
  { label: 'ชั้นมัธยมปีที่ 1-3', value: 'level4' },
  { label: 'ชั้นประถมปีที่ 1-3', value: 'level2' },
  { label: 'อนุบาล', value: 'level1' },
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
    value: 1,
    label:
      'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา)',
  },
];
