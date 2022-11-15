import { SchRequestProcess } from '@ksp/shared/interface';

export const selfOccupyList = [
  {
    systemId: 1,
    id: 1,
    name: 'ครู',
  },
  {
    systemId: 1,
    id: 2,
    name: 'ผู้บริหารสถานศึกษา',
  },
  {
    systemId: 1,
    id: 3,
    name: 'ผู้บริหารการศึกษา',
  },
  {
    systemId: 1,
    id: 4,
    name: 'ศึกษานิเทศก์',
  },
  {
    systemId: 1,
    id: 5,
    name: 'อื่นๆ',
  },
];

export const SelfRequestProcess: SchRequestProcess[] = [
  //ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ
  {
    requestType: 1,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 1,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 1,
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
    requestType: 1,
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
    requestType: 1,
    processId: 5,
    processName: 'พิจารณาและรับรองคณะอนุกรรมการ',
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
    requestType: 1,
    processId: 6,
    processName: 'พิจารณาและรับรองคณะกรรมการ', // กมว.
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'รับรอง/พิจารณา', ename: 'รับรอง/พิจารณา' },
      { id: 3, sname: 'เสร็จสิ้น', ename: 'เสร็จสิ้น' },
    ],
  },

  //ขอต่ออายุใบอนุญาตประกอบวิชาชีพ
  {
    requestType: 2,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 2,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 2,
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
    requestType: 2,
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
    requestType: 2,
    processId: 5,
    processName: 'พิจารณาและรับรองคณะอนุกรรมการ',
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
    requestType: 2,
    processId: 6,
    processName: 'พิจารณาและรับรองคณะกรรมการ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'รับรอง/พิจารณา', ename: 'รับรอง/พิจารณา' },
      { id: 3, sname: 'เสร็จสิ้น', ename: 'เสร็จสิ้น' },
    ],
  },

  //ขอคืนเงินค่าธรรมเนียม
  {
    requestType: 30,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: '' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: '' },
    ],
  },
  {
    requestType: 30,
    processId: 2,
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
    requestType: 30,
    processId: 3,
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
    requestType: 30,
    processId: 4,
    processName: 'พิจารณาการคืนเงิน',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'รอดำเนินการคืนเงิน', ename: 'รอดำเนินการคืนเงิน' },
      {
        id: 3,
        sname: 'ดำเนินการคืนเงินเรียบร้อย',
        ename: 'ดำเนินการคืนเงินเรียบร้อย',
      },
    ],
  },
];
