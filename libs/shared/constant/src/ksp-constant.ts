export interface RequestStatus {
  id: number;
  sname: string;
  ename: string;
}

export interface RequestProcess {
  requestType: number;
  processId: number;
  processName: string;
  status: RequestStatus[]; //[{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
}

export class SelfLicense {
  id: string | null = null;
  createdate: string | null = null;
  updatedate: string | null = null;
  careertype: string | null = null;
  renewtype: string | null = null;
  isforeign: string | null = null;
  licenseno: string | null = null;
  requestno: string | null = null;
  licensestartdate: string | null = null;
  licenseenddate: string | null = null;
  licensestatus: string | null = null;
  licensetype: string | null = null;
  teachercouncilidno: string | null = null;
  imageid: string | null = null;
  idcardno: string | null = null;
  prefixth: string | null = null;
  firstnameth: string | null = null;
  lastnameth: string | null = null;
  prefixen: string | null = null;
  firstnameen: string | null = null;
  lastnameen: string | null = null;
  passportno: string | null = null;
  addressinfo: string | null = null;
  schooladdrinfo: string | null = null;
  eduinfo: string | null = null;
  experienceinfo: string | null = null;
  competencyinfo: string | null = null;
  selfdevelopmentinfo: string | null = null;
  fileinfo: string | null = null;
}

export interface KspFile {
  fileid: string;
  filename: string;
  uniquetimestamp?: string;
}
export interface FileGroup {
  files: KspFile[];
  name: string;
}
