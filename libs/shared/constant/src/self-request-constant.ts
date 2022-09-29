import { RequestProcess } from './ksp-constant';

export const SelfRequestProcess: RequestProcess[] = [
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
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 3,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
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
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการรับรอง/พิจารณา', ename: '' },
      { id: 3, sname: 'ไม่ผ่านการรับรอง/พิจารณา', ename: '' },
    ],
  },

  //ขอสร้างเลขคุรุสภาสำหรับครูชาวต่างชาติ
  {
    requestType: 4,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 4,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: '' },
      { id: 3, sname: 'ไม่ผ่านการตรวจสอบ', ename: '' },
    ],
  },

  //ขอหนังสือรับรองคุณวุฒิการศึกษา
  {
    requestType: 6,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 6,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: '' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: '' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: '' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: '' },
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

  //ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม
  {
    requestType: 40,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 40,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 40,
    processId: 3,
    processName: 'ตรวจสอบเอกสาร',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ปรับแก้ไข/เพิ่มเติม', ename: '' },
      { id: 3, sname: 'ผ่านการตรวจสอบ', ename: '' },
      { id: 4, sname: 'ไม่ผ่านการตรวจสอบ', ename: '' },
      { id: 5, sname: 'ส่งคืนและยกเลิก', ename: '' },
      { id: 6, sname: 'คัดค้าน/เพิกถอน', ename: '' },
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
];
