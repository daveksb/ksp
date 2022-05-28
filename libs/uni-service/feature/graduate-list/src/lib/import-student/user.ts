export interface User {
  /*   isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isEdit: boolean; */
  id: number;
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

  isEdit: boolean;
  isSelected: boolean;
}

export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'titleTh',
    type: 'text',
    label: 'titleTh',
  },
  {
    key: 'lastNameTh',
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'firstNameTh',
    type: 'text',
    label: 'firstNameTh',
  },
  {
    key: 'phone',
    type: 'text',
    label: 'phone',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
  /*   {
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
];
