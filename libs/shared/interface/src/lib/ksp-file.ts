export interface KspFile {
  fileid: string;
  filename: string;
  uniquetimestamp?: string;
}
export interface FileGroup {
  files: KspFile[];
  name: string;
}
