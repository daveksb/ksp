export interface KspResponse {
  id?: string;
  returncode: string;
  returnmessage: string;
}

export interface KspListResponse<T = any> {
  returncode: string;
  returnmessage: string;
  countrow: number;
  datareturn: T[];
}
