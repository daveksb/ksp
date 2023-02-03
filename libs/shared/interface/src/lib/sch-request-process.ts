export interface SchRequestProcess {
  requestType: number;
  processId: number;
  processName: string;
  status: SchRequestStatus[]; //[{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
}

export interface SchRequestStatus {
  id: number;
  sname: string;
  ename: string;
}
