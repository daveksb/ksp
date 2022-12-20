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
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
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
    processName: 'จัดทำกลุ่มบัญชีรายชื่อ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
    ],
  },
  {
    requestType: 1,
    processId: 6,
    processName: 'พิจารณาและรับรองคณะอนุกรรมการ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการพิจารณา', ename: 'ผ่านการพิจารณา' },
      { id: 3, sname: 'ไม่ผ่านการพิจารณา', ename: 'ไม่ผ่านการพิจารณา' },
    ],
  },
  {
    requestType: 1,
    processId: 7,
    processName: 'พิจารณาและรับรองคณะกรรมการ', // กมว.
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการพิจารณา', ename: 'ผ่านการพิจารณา' },
      { id: 3, sname: 'ไม่ผ่านการพิจารณา', ename: 'ไม่ผ่านการพิจารณา' },
    ],
  },

  //ขอต่ออายุใบอนุญาตประกอบวิชาชีพ
  {
    requestType: 2,
    processId: 1,
    processName: 'สร้างใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
    ],
  },
  {
    requestType: 2,
    processId: 2,
    processName: 'สร้างและส่งใบคำขอ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
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
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
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

  //ขอรับรางวัล xxx
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
    processName: 'เจ้าหน้าที่ส่วนจังหวัดตรวจสอบ',
    status: [
      { id: 0, sname: 'ครบถ้วนและถูกต้อง', ename: 'ครบถ้วนและถูกต้อง' },
      { id: 1, sname: 'ขอแก้ไข/เพิ่มเติม', ename: 'ขอแก้ไข/เพิ่มเติม' },
      { id: 2, sname: 'คัดค้าน/เพิกถอน', ename: 'คัดค้าน/เพิกถอน' },
    ],
  },
  {
    requestType: 40,
    processId: 4,
    processName: 'เจ้าหน้าที่ส่วนจังหวัดจัดทำบัญชีรายชื่อ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
    ],
  },
  {
    requestType: 40,
    processId: 5,
    processName: 'เจ้าหน้าที่ส่วนกลาง ตรวจสอบ บันทึกผล',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
    ],
  },
  {
    requestType: 40,
    processId: 6,
    processName: 'เจ้าหน้าที่ส่วนกลาง ประกาศรายชื่อ',
    status: [
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'รอการตรวจสอบ' },
      { id: 2, sname: 'ผ่านการตรวจสอบ', ename: 'ผ่านการตรวจสอบ' },
    ],
  },
];
