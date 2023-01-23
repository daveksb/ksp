export interface RequestSearchFilter {
  schoolinfo: RequestSchoolInfo | undefined;
  requestno: string | undefined;
  name: string | undefined;
  requestdatefrom: string | undefined;
  requeststatus: string | undefined;
  requesttype: string | undefined;
  passportno?: string | undefined;
}

export interface RequestSchoolInfo {
  bureauid: string;
  schoolid: string;
  schoolname: string;
}

export interface SchRequestSearchFilter {
  schoolid: string | undefined | null;
  requesttype: string | undefined | null;
  requestno: string | undefined | null;
  careertype: string | undefined | null;
  name: string | undefined | null;
  idcardno: string | undefined | null;
  provinceid?: string | undefined | null;
  passportno: string | undefined | null;
  process: string | undefined | null;
  status: string | undefined | null;
  requestdatefrom: string | undefined | null;
  requestdateto: string | undefined | null;
  offset: string | undefined | null;
  row: string | undefined | null;
}

export class KSPRequestSelfSearchFilter {
  requesttype: string | null = null;
  requestno: string | null = null;
  requestdate: string | null = null;
  status: string | null = null;
  process: string | null = null;
  paymentstatus: string | null = null;
  idcardno: string | null = null;
  kuruspano: string | null = null;
  offset: string | undefined | null = '0';
  row: string | undefined | null = '500';
}
