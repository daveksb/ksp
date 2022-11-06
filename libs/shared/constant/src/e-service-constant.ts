import { ApproveUniOption, ListData } from "@ksp/shared/interface";


export const ApproveStepStatusOption:ApproveUniOption[] = [
  {
    name: 'เครบถ้วน และถูกต้อง',
    value: 1,
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 2,
  },
];

export const UniAdmissionStatus: ListData[] = [
  {
    name: 'ส่งคืนและยกเลิก',
    label: 'ส่งคืนและยกเลิก',
    value: '0'
  },
  {
    name: 'รอตรวจสอบ',
    label: 'รอตรวจสอบ',
    value: '1'
  },
  {
    name: 'แก้ไข',
    label: 'แก้ไข',
    value: '2'
  },
  {
    name: 'ตรวจสอบเรียบร้อย',
    label: 'ตรวจสอบเรียบร้อย',
    value: '3'
  }
];
