import { SchRequestStatus } from '@ksp/shared/interface';

export interface SelfApproveListProcess {
  processId: string;
  processName: string;
  status: SchRequestStatus[]; //[{ id: 1, sname: 'ยกเลิก', ename: 'ยกเลิก' }],
}
