export class SelfApproveList {
  id: string | null = null;
  approvedate: string | null = null;
  careertype: string | null = null;
  requesttype: string | null = null; // add 18-1-2023
  considerdate: string | null = null;
  createdate: string | null = null;
  forwardtolicensecreate: string | null = null;
  groupno: string | null = null;
  isforeign: string | null = null;
  listno: string | null = null;
  matilevel1: string | null = null;
  matilevel2: string | null = null;
  process: string | null = null;
  requestlist: string | null = null;
  status: string | null = null;
  userid: string | null = null;
}

export class SelfApproveListSearch {
  groupno: string | null = null;
  createdate: string | null = null;
  process: string | null = null;
  status: string | null = null;
  careertype: string | null = null;
  requesttype: string | null = null;
  isforeign?: string | null = null;
  approvedatefrom?: string | null = null;
  approvedateto?: string | null = null;
  offset: string | null = null;
  row: string | null = null;
}

export class SelfApproveGroup {
  id: string | null = null;
  createdate: string | null = null;
  grouplist: string | null = null;
  groupno: string | null = null;
  matilevel1boardname: string | null = null;
  matilevel1date: string | null = null;
  matilevel1detail: string | null = null;
  matilevel1fileinfo: string | null = null;
  matilevel1no: string | null = null;
  matilevel1presidentname: string | null = null;
  matilevel1result: string | null = null;
  matilevel2boardname: string | null = null;
  matilevel2date: string | null = null;
  matilevel2detail: string | null = null;
  matilevel2fileinfo: string | null = null;
  matilevel2no: string | null = null;
  matilevel2presidentname: string | null = null;
  matilevel2result: string | null = null;
  userid: string | null = null;
}

export interface SelfApprovelicenseData {
  order: number;
  licenseType: string;
  label: string;
  count: number;
}
