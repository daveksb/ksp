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
  careertype: string | null = null;
}
