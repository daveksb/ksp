export interface RequestSearchFilter {
  schoolinfo: SchoolInfo | undefined;
  requestno: string | undefined;
  name: string | undefined;
  requestdatefrom: string | undefined;
  requeststatus: string | undefined;
}

export interface SchoolInfo {
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
  passportno: string | undefined | null;
  process: string | undefined | null;
  status: string | undefined | null;
  requestdatefrom: string | undefined | null;
  requestdateto: string | undefined | null;
  offset: string | undefined | null;
  row: string | undefined | null;
}
