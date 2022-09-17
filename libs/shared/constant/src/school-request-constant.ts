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

// url params keep in db for temp license request
export enum SchoolRequestSubType {
  'ครู' = 1,
  'ผู้บริหารสถานศึกษา' = 2,
  'อื่นๆ' = 5,
}

// สถานะใบคำขอ
export enum SchoolRequestProcess {
  'กำลังสร้าง',
  'ยื่นใบคำขอ',
  'กำลังดำเนินการ',
  'ปรับแก้ไข/เพิ่มเติม',
  'ผ่านการตรวจสอบ',
  'ผ่านการรับรอง/พิจารณา',
  'ไม่ผ่านการรับรอง/พิจารณา',
  'ส่งคืนและยกเลิก',
  'หมดอายุ',
  'ยกเลิก',
}

export enum UserInfoFormType {
  'thai',
  'foreign',
  //'register',
}

export const RequestProcessStatus = [
  //ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ
  {
    requestType: 3,
    processId: 1,
    processName: { sname: 'สร้างใบคำขอ', ename: '' },
    status: [
      { id: 1, name: 'กำลังดำเนินการ' },
      { id: 2, name: 'ยกเลิก' },
    ],
  },
  {
    requestType: 3,
    processId: 2,
    processName: { sname: 'สร้างและใบคำขอ', ename: 'รอการตรวจสอบ' },
    status: [
      { id: 1, name: 'กำลังดำเนินการ' },
      { id: 2, name: 'ยกเลิก' },
    ],
  },
  {
    requestType: 3,
    processId: 3,
    processName: {
      sname: 'ตรวจสอบเอกสาร ลำดับที่ 1',
      ename: 'ตรวจสอบเอกสาร ลำดับที่ 1',
    },
    status: [
      { id: 1, name: 'กำลังดำเนินการ' },
      { id: 2, name: 'ปรับแก้ไข/เพิ่มเติม' },
      { id: 3, name: 'ผ่านการตรวจสอบ' },
      { id: 4, name: 'ไม่ผ่านการตรวจสอบ' },
      { id: 5, name: 'ส่งคืนและยกเลิก' },
    ],
  },
  {
    requestType: 3,
    processId: 4,
    processName: {
      sname: 'ตรวจสอบเอกสาร ลำดับที่ 2',
      ename: 'ตรวจสอบเอกสาร ลำดับที่ 2',
    },
    status: [
      { id: 1, name: 'กำลังดำเนินการ' },
      { id: 2, name: 'ผ่านการรับรอง/พิจารณา' }, //ออกหนังสือ
      { id: 3, name: 'ไม่ผ่านการรับรอง/พิจารณา' },
    ],
  },

  //ขอสร้างเลขคุรุสภาสำหรับครูชาวต่างชาติ
  {
    requestType: 4,
    processId: 1,
    processName: { sname: 'สร้างและส่งใบคำขอ', ename: 'รอการตรวจสอบ' },
    status: [
      { id: 1, name: 'กำลังดำเนินการ' },
      { id: 2, name: 'ยกเลิก' },
    ],
  },
  {
    requestType: 4,
    processId: 2,
    processName: { sname: 'ตรวจสอบเอกสาร', ename: 'ตรวจสอบเอกสาร' },
    status: [
      { id: 1, name: 'กำลังดำเนินการ' },
      { id: 2, name: 'ผ่านการตรวจสอบ' }, // ออกเลขคุรุสภา
      { id: 3, name: 'ไม่ผ่านการตรวจสอบ' },
      { id: 4, name: 'ยกเลิก' },
    ],
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
