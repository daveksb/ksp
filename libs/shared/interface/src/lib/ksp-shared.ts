export interface MenuConfig {
  icon?: string;
  label: string;
  path: string;
  params?: KspParam;
  subMenu?: MenuConfig[];
  subMenuName?: string;
  isExpanded?: boolean;
}

export interface KspParam {
  type?: number;
  subtype?: number;
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
