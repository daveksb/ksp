export interface User {
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
}
