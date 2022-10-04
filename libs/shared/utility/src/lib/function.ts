import { SchoolRequestProcess, SchoolRequestType } from '@ksp/shared/constant';
import { SchoolRequest } from '@ksp/shared/interface';
import moment from 'moment';

// return Thai date format, Use in component
export function stringToThaiDate(
  sDate: string,
  format = 'DD MMM YYYY'
): string {
  try {
    return moment(sDate).locale('th-TH').format(format);
  } catch (error) {
    return '-';
  }
}
// return Thai date format, Use in component
export function thaiDate(date: Date): string {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// format json data
// from [null,'true',null,'true',null,null] ===> ['s2','s4']
export function formatCheckboxData(input: any[], source: any[]) {
  const result = input
    .map((v, i) => (v ? source[i].value : null))
    .filter((v) => v !== null);
  //console.log('map data = ', result);
  //return JSON.stringify(result);
  return result;
}

// replace object value from empty --> null
export function replaceEmptyWithNull(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (value === '') {
      input[key] = null;
    }
  }
  return input;
}

// parse json with Thai characters support
export function parseJson(input: any) {
  if (input) {
    return JSON.parse(decodeURIComponent(escape(window.atob(input))));
  } else {
    return null;
  }
}

export function toLowercaseProp(input: any) {
  return Object.keys(input).reduce((destination: any, key) => {
    destination[key.toLowerCase()] = input[key];
    return destination;
  }, {});
}

export function applyClientFilter(data: SchoolRequest[], searchParams: any) {
  //
  const { requesttype, ...param } = searchParams;
  //console.log('param = ', param);
  return data.filter((d) => {
    const filter1 = param.requestno
      ? d.requestno?.includes(param.requestno)
      : true;

    const filter2 = param.subtype ? `${d.subtype}` === param.subtype : true;

    const filter3 = param.firstnameth
      ? d.firstnameth?.includes(param.firstnameth) ||
        d.lastnameth?.includes(param.firstnameth)
      : true;

    const filter4 = param.idcardno
      ? d.idcardno?.includes(param.idcardno)
      : true;

    const filter5 = param.passportno
      ? d.passportno?.includes(param.passportno)
      : true;

    const filter6 = param.currentprocess
      ? `${d.currentprocess}` === param.currentprocess
      : true;

    const filter7 = param.requeststatus
      ? `${d.requeststatus}` === param.requeststatus
      : true;

    return (
      filter1 && filter2 && filter3 && filter4 && filter5 && filter6 && filter7
    );
  });
}

export function checkProcess(processId: number) {
  const process = SchoolRequestProcess.find((p) => {
    return p.processId === processId && p.requestType === 3;
  });
  return process;
}

export function checkStatus(processId: number, statusId: number) {
  //console.log('p = ', processId, ' s = ', statusId);
  const process = checkProcess(processId);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  return status;
}

export function checkRequestType(RequestTypeId: number) {
  return SchoolRequestType.find((s) => s.id === RequestTypeId)?.name;
}

// get file in base 64 format
export function getBase64(
  file: File
): Promise<FileReader['result'] | ProgressEvent<FileReader>> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (error) => rej(error);
  });
}

/**
 *
 * @param input return correct format date to send to API
 * @returns
 */
export function formatDate(input: string) {
  return input.split('T')[0];
}

export function mapFileInfo(fileList: any[]) {
  return fileList.map((file: any) => {
    const object = {
      fileid: file.fileId || null,
      filename: file.fileName || null,
    };
    return object;
  });
}
export function jsonParse(object: string): any {
  try {
    return JSON.parse(object);
  } catch (e) {
    return null;
  }
}

export function jsonStringify(object: any): string {
  try {
    if (typeof object === 'string') return object;
    return JSON.stringify(object);
  } catch (e) {
    return '';
  }
}
