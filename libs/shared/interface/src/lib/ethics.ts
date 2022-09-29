import { Route } from '@angular/router';
export type EthicsMode = 'accusation' | 'investigation' | 'inquiry' | 'publish';

export interface EthicsCustomRouteData {
  menuConfig: MenuConfig[];
  headerLabel: string;
  headerDetail?: string;
  ethicsMode?: EthicsMode;
}

export interface MenuConfig {
  icon?: string;
  label: string;
  path: string;
  params?: any;
  subMenu?: MenuConfig[];
  subMenuName?: string;
  isExpanded?: boolean;
}

export interface EthicsCustomRoute extends Route {
  data?: EthicsCustomRouteData;
}
export class Ethics {
  //id?: string | null = null;
  ethicsno: string | null = null;
  accuserinfo: string | null = null;
  licenseinfo: string | null = null;
  addressinfo: string | null = null;
  workplaceinfo: string | null = null;
  idcardno: string | null = '999999999';
  passportno: string | null = null;
  prefixth: string | null = null;
  firstnameth: string | null = null;
  lastnameth: string | null = null;
  prefixen: string | null = null;
  firstnameen: string | null = null;
  lastnameen: string | null = null;
  birthdate: string | null = null;
  sex: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  accusationblackno: string | null = null;
  accusationtype: string | null = null;
  accusationincidentdate: string | null = null;
  accusationincidentplace: string | null = null;
  accusationcondemnationtype: string | null = null;
  accusationcondemnation: string | null = null;
  accusationissuedate: string | null = null;
  accusationdetail: string | null = null;
  accusationpunishmentdetail: string | null = null;
  accusationviolatedetail: string | null = null;
  accusationassignofficer: string | null = null;
  accusationassigndate: string | null = null;
  accusationfile: string | null = null;
  accusationconsideration: string | null = null;

  investigationorderno: string | null = null;
  investigationorderdate: string | null = null;
  investigationsubcommittee: string | null = null;
  investigationdate: string | null = null;
  investigationreportdate: string | null = null;
  investigationreport: string | null = null;
  investigationfile: string | null = null;
  investigationresult: string | null = null;

  inquiryorderno: string | null = null;
  inquiryorderdate: string | null = null;
  inquirysubcommittee: string | null = null;
  inquiryexplaindate: string | null = null;
  inquiryjbdate: string | null = null;
  inquiryreport: string | null = null;
  inquiryfile: string | null = null;
  inquiryresult: string | null = null;

  resultredno: string | null = null;
  resultcomitteeno: string | null = null;
  resultcomitteedate: string | null = null;
  resultcomitteefile: string | null = null;
  resulttoaccuserdate: string | null = null;
  resulttoaccuserfile: string | null = null;
  resulttoschooldate: string | null = null;
  resulttoschoolfile: string | null = null;
  resulttoaccuseddate: string | null = null;
  resulttoaccusedfile: string | null = null;

  publishstatus: string | null = null;
  publishdate: string | null = null;
}
