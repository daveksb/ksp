export interface KspRequestCancelPayload {
  requestid: string;
  process: string;
  status: string;
  detail?: string;
  userid: string;
  paymentstatus?: string;
}
