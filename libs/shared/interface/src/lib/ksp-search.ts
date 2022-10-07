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
