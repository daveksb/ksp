export interface ApproveUniOption{
  value:number,
  name:string;
}

export type UniApproveProcess = {
  requestType: number;
  processId: number;
  processName: string;
  status: UniApproveStatus[]; 
}



export interface UniApproveStatus {
  id: number;
  sname: string;
  ename: string;
}

