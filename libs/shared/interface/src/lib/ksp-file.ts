import { KspCheckResult } from './ksp-general';

export interface KspFile {
  fileid: string;
  filename: string;
  uniquetimestamp?: string;
}
export interface FileGroup {
  files: KspFile[];
  name: string;
  checkresult?: KspCheckResult[];
}

export interface FileUpload {
  pagetype: string;
  originalname: string;
  systemname: string;
  file: string;
  uniquetimestamp: string;
  requesttype: string;
}

export interface ImageUpload {
  file: string;
  filetype: string;
  originalname: string;
  uniquetimestamp: string;
}

export const mapCheckFile = (fileGroup: FileGroup[]) => (item: FileGroup) => {
  const checkItem = fileGroup.find((x: FileGroup) => x.name === item.name);
  return {
    ...item,
    checkresult: checkItem ? checkItem.checkresult : null,
  };
};
