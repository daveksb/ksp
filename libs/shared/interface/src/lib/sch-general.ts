export interface AcademicStanding {
  id: string;
  name: string;
}

export type PersonType = AcademicStanding;
export type CareerType = AcademicStanding;
export type PositionType = AcademicStanding;
export type RewardType = AcademicStanding;
export type StaffType = AcademicStanding;
export type VisaClass = AcademicStanding;

export interface VisaType {
  id: string;
  nameEn: string;
  nameTh: string;
}

export interface Bureau {
  bureauGrp: string;
  bureauGrpName: string;
  bureauId: string;
  bureauMap: string;
  bureauMaster: string;
  bureauMasterOrder: string;
  bureauName: string;
  bureauNameS: string;
  bureauPv: string;
  bureauStatus: string;
}
