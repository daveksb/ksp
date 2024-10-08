import { AbstractControl } from '@angular/forms';
import {
  EnglishMonthMapping,
  levels,
  SchoolRequestProcess,
  SchoolRequestType,
  SchoolSelfDevelopActivityTies,
  SelfRequestProcess,
  SelfRequestType,
  subjects,
  ThaiNumberMapping,
} from '@ksp/shared/constant';
import { FileGroup, KspRequest } from '@ksp/shared/interface';
import _ from 'lodash';
import moment from 'moment';

export function schoolHasRejectedRequest(requests: KspRequest[]): KspRequest[] {
  return requests.filter((req) => {
    //ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีหนังสืออนุญาตประกอบวิชาชีพ
    const condition1 =
      req.requesttype === '3' && req.process === '3' && req.status === '2';

    //ขอหนังสือรับรองคุณวุฒิการศึกษา
    const condition2 =
      req.requesttype === '6' && req.process === '2' && req.status === '2';
    return condition1 || condition2;
  });
}

export function hasLevel2RejectedRequest(requests: KspRequest[]): KspRequest[] {
  return requests.filter((req) => {
    const condition1 =
      req.requesttype === '3' && req.process === '4' && req.status === '2';
    return condition1;
  });
}

export function formatRequestNo(input: string) {
  if (!input.includes('-')) {
    const s1 = input.slice(0, 1);
    const s2 = input.slice(1, 3);
    const s3 = input.slice(3, 4);
    const s4 = input.slice(4, 10);
    const s5 = input.slice(10);
    return `${s1}-${s2}-${s3}-${s4}-${s5}`;
  } else {
    return input;
  }
}
// return Thai date format,
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
// return Thai date format
export function thaiDate(date: Date): string {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function englishDate(date: Date): string {
  return date.toLocaleDateString('th-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
export function changeToThaiNumber(text: string = ''): string {
  for (const key in ThaiNumberMapping) {
    const regExp = new RegExp(key, 'g');
    text = text.replace(regExp, ThaiNumberMapping[+key]);
  }
  return text;
}
export function changeToEnglishMonth(text: string): string {
  for (const key in EnglishMonthMapping) {
    const regExp = new RegExp(key, 'g');
    text = text.replace(regExp, EnglishMonthMapping[key]);
  }
  return text;
}
// format json data
// from [null,'true',null,'true',null,null] ===> ['s2','s4']
export function formatCheckboxData(input: any[], source: any[]) {
  const result = input
    .map((v, i) => (v ? source[i].value : null))
    .filter((v) => v !== null);
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

export function formatDatePayload(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (key.includes('date') && input[key]) {
      const date = moment(input[key]).format('YYYY-MM-DD');
      input[key] = formatDate(date);
    }
  }
  return input;
}

export function formatDateTimePayload(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (key.includes('date') && input[key]) {
      const date = moment(input[key]).format();
      input[key] = date.split('+')[0];
    }
  }
  return input;
}
/**
 *
 * @param input return correct format date to send to API
 * @returns
 */
export function formatDate(input: string | null | undefined) {
  if (input && input.length) {
    return input.split('T')[0];
  } else {
    return null;
  }
}

// replace object value from Undefined --> null
export function replaceUndefinedWithNull(input: any) {
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) {
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

export function checkProcess(processId: number, requestType: number) {
  const process = SchoolRequestProcess.find((p) => {
    return p.processId === processId && p.requestType === requestType;
  });
  //console.log('process = ', process);
  return process;
}

export function checkStatus(
  processId: number,
  statusId: number,
  requestType: number
) {
  const process = checkProcess(processId, requestType);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  //console.log('status = ', status);
  return status;
}

export function eSelfCheckProcess(processId: number, requestType: number) {
  const process = SelfRequestProcess.find((p) => {
    return p.processId === processId && p.requestType === requestType;
  });
  //console.log('process = ', process);
  return process;
}

export function eSelfCheckStatus(
  processId: number,
  statusId: number,
  requestType: number
) {
  //console.log('p = ', processId, 's = ', statusId, 'type = ', requestType);
  const process = eSelfCheckProcess(processId, requestType);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  //console.log('status = ', status);
  return status;
}

export function SelfCheckProcess(processId: number) {
  const process = SelfRequestProcess.find((p) => {
    return p.processId === processId;
  });
  return process;
}

export function SelfcheckStatus(processId: number, statusId: number) {
  //console.log('p = ', processId, ' s = ', statusId);
  const process = SelfCheckProcess(processId);
  const status = process?.status.find((s) => {
    return s.id == statusId;
  });
  return status;
}

export function schoolMapRequestType(typeId: number) {
  return SchoolRequestType.find((s) => s.id === typeId)?.name;
}

export function schoolMapSelfDevelopType(typeId: number) {
  return SchoolSelfDevelopActivityTies.find((s) => s.value === typeId)?.label;
}

export function selfMapRequestType(typeId: string) {
  return SelfRequestType.find((s) => s.id.toString() === typeId)?.name;
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

export function mapFileInfo(fileGroups: any[]) {
  return fileGroups.map((file: any) => {
    const object = {
      fileid: file.fileid || null,
      filename: file.filename || null,
    };
    return object;
  });
}

export function mapMultiFileInfo(groups: FileGroup[]) {
  return groups.map((group) => {
    return group.files;
  });
}

export function jsonParse(object: string): string | null {
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

export function applyClientFilter(data: KspRequest[], param: any) {
  //const { requesttype, ...param } = searchParams;
  return data.filter((d) => {
    const filter1 = param.process ? `${d.process}` === param.process : true;
    const filter2 = param.status ? `${d.status}` === param.status : true;
    return filter1 && filter2;
  });
}

export function processFilter(data: KspRequest[], process = 1) {
  return data.filter((d) => Number(d.process) > process);
}

/* export function genKuruspaNo() {
  const d1 = 6;
  const d2 = 5;
  const d3 = Math.floor(Math.random() * 10);
  const d4 = Math.floor(Math.random() * 10);
  const d5 = Math.floor(Math.random() * 10);
  const d6 = Math.floor(Math.random() * 10);
  const d7 = Math.floor(Math.random() * 10);
  const d8 = Math.floor(Math.random() * 10);
  const d9 = Math.floor(Math.random() * 10);
  const d10 = Math.floor(Math.random() * 10);
  const d11 = Math.floor(Math.random() * 10);
  const d12 = Math.floor(Math.random() * 10);
  let d13;
  const n13 =
    11 -
    ((d1 * 13 +
      d2 * 12 +
      d3 * 11 +
      d4 * 10 +
      d5 * 9 +
      d6 * 8 +
      d7 * 7 +
      d8 * 6 +
      d9 * 5 +
      d10 * 4 +
      d11 * 3 +
      d12 * 2) %
      11);
  if (n13 >= 10) {
    d13 = n13 - 10;
  } else {
    d13 = n13;
  }
  const cid = `${d1}${d2}${d3}${d4}${d5}${d6}${d7}${d8}${d9}${d10}${d11}${d12}${d13}`;
  return cid;
} */

export function validateIdCard(
  control: AbstractControl
): { [key: string]: any } | null {
  //console.log('validate id card = ');
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    if (control.value) {
      sum += parseFloat(control.value.charAt(i)) * (13 - i);
    }
  }

  if (
    control.value &&
    (11 - (sum % 11)) % 10 != parseFloat(control.value.charAt(12))
  ) {
    return { idCardInvalid: true };
  } else {
    return null;
  }
}

export function validatePassword(
  control: AbstractControl
): { [key: string]: any } | null {
  if (
    /[A-Z]/.test(control.value) &&
    /[a-z]/.test(control.value) &&
    /[0-9]/.test(control.value) &&
    ///[^A-Za-z0-9]/.test(control.value) &&
    control.value.length > 7
  ) {
    return null;
  } else {
    return { passwordInvalid: true };
  }
}

export function addDate(
  date: Date,
  d: number = 0,
  m: number = 0,
  y: number = 0
): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const c = new Date(year + y, month + m, day + d - 1);
  return c;
}

export function isIdCard(idCard: any) {
  try {
    if (_.isNaN(_.toNumber(idCard)) || idCard.length != 13) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(idCard.charAt(i)) * (13 - i);
    }
    const mod = sum % 11;
    const check = (11 - mod) % 10;
    return check == parseInt(idCard.charAt(12));
  } catch (error) {
    return false;
  }
}

export function teachingSubjects(id: any) {
  return subjects.find((s) => s.value === id)?.label;
}

export function teachingLevels(id: any) {
  return levels.find((s) => s.value === id)?.label;
}

export function dateDiff(date1: Date, date2: Date) {
  if (!date1 || !date2) return 0;
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  const diffTime = Math.abs(newDate1.getTime() - newDate2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function toUpperCaseName(character: any) {
  const upperChar = character ? character.toUpperCase() : '';
  return upperChar;
}
