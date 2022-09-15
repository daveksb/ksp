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

// ใช้ อ้างอิง tab ในหน้าใบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง
export enum RequestPageType {
  educationTab = 'educationTab',
  teachingTab = 'teachingTab',
  reasonTab = 'reasonTab',
  fileAttachTab = 'fileAttachTab',
}

export enum SchoolRequestType {
  'ขอยื่นผู้ประสานงาน' = 1,
  'ขอยื่นถอดถอนผู้ประสานงาน' = 2,
  'ขอหนังสืออนุญาตประกอบวิชาชีพ' = 3,
  'ขอสร้างเลขประจำตัวคุรุสภาสำหรับชาวต่างชาติ' = 4,
  'ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ ไม่มีใบอนุญาต' = 5,
  'ขอหนังสือรับรองคุณวุฒิ' = 6,
  'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI)' = 40,
}

// url params keep in db for temp license request
export enum SchoolRequestSubType {
  '-',
  'ครู',
  'ผู้บริหารสถานศึกษา',
  'ชาวต่างชาติ',
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
