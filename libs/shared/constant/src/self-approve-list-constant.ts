import { SchRequestStatus } from '@ksp/shared/interface';

export interface SelfApproveListProcess {
  processId: string;
  processName: string;
  status: SchRequestStatus[]; //[{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
}

export const SelfApproveListProcesses: SelfApproveListProcess[] = [
  //สถานะของบัญชีรายชื่อขอใบอนุญาตประกอบวิชาชีพ
  {
    processId: '1',
    processName: 'จัดทำกลุ่มบัญชีรายชื่อ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'ผ่านการพิจารณา', ename: 'ผ่านการพิจารณา' },
      { id: 3, sname: 'ไม่ผ่านการพิจารณา', ename: 'ไม่ผ่านการพิจารณา' },
    ],
  },
  {
    processId: '2',
    processName: 'รับรองใบอนุญาตประกอบวิชาขีพ',
    status: [
      { id: 0, sname: 'ยกเลิก', ename: 'ยกเลิก' },
      { id: 1, sname: 'กำลังดำเนินการ', ename: 'กำลังดำเนินการ' },
      { id: 2, sname: 'ผ่านการพิจารณา', ename: 'ผ่านการพิจารณา' },
      { id: 3, sname: 'ไม่ผ่านการพิจารณา', ename: 'ไม่ผ่านการพิจารณา' },
    ],
  },
];
