export interface KspResponse {
  id?: string;
  returncode: string;
  returnmessage: string;
}

export interface KspListResponse {
  returncode: string;
  returnmessage: string;
  countrow: number;
  datareturn: any[];
}
