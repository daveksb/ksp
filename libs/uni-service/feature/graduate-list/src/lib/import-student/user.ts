export interface StudentImport {
  order: number;
  startDate: string;
  personId: string;
  titleTh: string;
  firstNameTh: string;
  lastNameTh: string;
  titleEn: string;
  firstNameEn: string;
  middleNameEn?: string;
  lastNameEn: string;
  phone: string;
  birthDate: string;
  address: string;

  approveTime?: number;
  graduateDate?: string;
  approveDate?: string;
  trainingAddress?: string;
}

export const UserColumns = [
  /* {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    pattern: '.+@.+',
  },
  {
    key: 'birthDate',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  }, */

  {
    key: 'order',
    type: 'text',
    label: 'ลำดับ',
  },
  {
    key: 'startDate',
    type: 'text',
    label: 'วันที่รับเข้า',
  },
  {
    key: 'personId',
    type: 'text',
    label: 'เลขบัตรประจำตัวประชาชน',
  },
  {
    key: 'titleTh',
    type: 'text',
    label: 'คำนำหน้าชื่อ(ไทย)',
  },
  {
    key: 'firstNameTh',
    type: 'text',
    label: 'ชื่อ(ไทย)',
  },
  {
    key: 'lastNameTh',
    type: 'text',
    label: 'นามสกุล(ไทย)',
  },
  {
    key: 'titleEn',
    type: 'text',
    label: 'คำนำหน้าชื่อ(อังกฤษ)',
  },
  {
    key: 'firstNameEn',
    type: 'text',
    label: 'ชื่อ(อังกฤษ)',
  },
  {
    key: 'middleNameEn?',
    type: 'text',
    label: 'ชื่อกลาง(อังกฤษ)',
  },
  {
    key: 'lastNameEn',
    type: 'text',
    label: 'นามสกุล(อังกฤษ)',
  },
  {
    key: 'phone',
    type: 'text',
    label: 'เบอร์โทรศัพท์',
  },
  {
    key: 'birthDate',
    type: 'text',
    label: 'วัน/เดือน/ปีเกิด(พ.ศ.)',
  },
  {
    key: 'address',
    type: 'text',
    label: 'ที่อยู่',
  },
];
