import { RequestSchoolInfo } from './ksp-search';

export interface ESchUserSearch {
  institution: RequestSchoolInfo;
  personId: string;
  name: string;
  status: string;
}
