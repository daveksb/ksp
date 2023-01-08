import {
  ApproveUniOption,
  ListData,
  UniApproveProcess,
} from '@ksp/shared/interface';

export const ApproveStepStatusOption: ApproveUniOption[] = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 1,
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 2,
  },
];

export const EUniApproveProcess: UniApproveProcess[] = [
  {
    requestType: 3,
    processId: 99,
    processName: 'บันทึกชั่วคราว',
    status: [{ id: 1, sname: 'บันทึกชั่วคราว', ename: 'บันทึกชั่วคราว' }],
  },
  {
    requestType: 3,
    processId: 1,
    processName: 'สร้างและส่งใบคำขอ',
    status: [{ id: 1, sname: 'สร้างและส่งใบคำขอ', ename: 'สร้างและส่งใบคำขอ' }],
  },
  // ขั้นตอนที่ 1 ตรวจสอบข้อมูลและเอกสาร ลำดับที่ 1
  {
    requestType: 3,
    processId: 2,
    processName: 'ตรวจสอบเอกสาร ลำดับที่ 1',
    status: [
      { id: 1, sname: 'ครบถ้วน และถูกต้อง', ename: 'ครบถ้วน และถูกต้อง' },
      { id: 2, sname: 'ขอแก้ไข / เพิ่มเติม', ename: 'ขอแก้ไข / เพิ่มเติม' },
    ],
  },
  // ขั้นตอนที่ 2 ตรวจสอบข้อมูลและเอกสาร ลำดับที่ 2
  {
    requestType: 3,
    processId: 3,
    processName: 'ตรวจสอบเอกสาร ลำดับที่ 2',
    status: [
      { id: 1, sname: 'ครบถ้วน และถูกต้อง', ename: 'ครบถ้วน และถูกต้อง' },
      { id: 2, sname: 'ขอแก้ไข / เพิ่มเติม', ename: 'ขอแก้ไข / เพิ่มเติม' },
    ],
  },

  //ขั้นตอนที่ 3 ประเมินและบันทึกผลการประเมินสภาพจริง
  {
    requestType: 3,
    processId: 4,
    processName: 'ประเมินสภาพจริง',
    considerationName: 'ประเมินสภาพจริง',
    status: [
      {
        sname: 'เห็นควรพิจารณาให้การรับรอง',
        id: 1,
        ename: 'เห็นควรพิจารณาให้การรับรอง',
      },
      {
        sname: 'เห็นควรพิจารณาไม่ให้การรับรอง',
        id: 2,
        ename: 'เห็นควรพิจารณาไม่ให้การรับรอง',
      },
      {
        sname: 'ให้สถาบันแก้ไข / เพิ่มเติม',
        id: 3,
        ename: 'ให้สถาบันแก้ไข / เพิ่มเติม',
      },
      { sname: 'ส่งคืนหลักสูตร', id: 4, ename: 'ส่งคืนหลักสูตร' },
    ],
  },
  //ขั้นตอนที่ 4 บันทึกผลส่งพิจารณาเพื่อรับรอง และพิจารณาเพื่อไม่รับรอง เจ้าหน้าที่สามารถทำการบันทึกสถานะคำขอได้ 2 รูปแบบ
  {
    requestType: 3,
    processId: 5,
    processName: 'พิจารณาและรับรอง',
    status: [
      {
        sname: 'เห็นควรพิจารณาให้การรับรอง',
        id: 1,
        ename: 'เห็นควรพิจารณาให้การรับรอง',
      },
      {
        sname: 'เห็นควรพิจารณาไม่ให้การรับรอง',
        id: 2,
        ename: 'เห็นควรพิจารณาไม่ให้การรับรอง',
      },
      {
        sname: 'ให้สถาบันแก้ไข / เพิ่มเติม',
        id: 3,
        ename: 'ให้สถาบันแก้ไข / เพิ่มเติม',
      },
      { sname: 'ส่งคืนหลักสูตร', id: 4, ename: 'ส่งคืนหลักสูตร' },
    ],
  },
];
export const UniAdmissionStatus: ListData[] = [
  {
    name: 'ส่งคืนและยกเลิก',
    label: 'ส่งคืนและยกเลิก',
    value: '0',
  },
  {
    name: 'รอตรวจสอบ',
    label: 'รอตรวจสอบ',
    value: '1',
  },
  {
    name: 'แก้ไข',
    label: 'แก้ไข',
    value: '2',
  },
  {
    name: 'ตรวจสอบเรียบร้อย',
    label: 'ตรวจสอบเรียบร้อย',
    value: '3',
  },
];
