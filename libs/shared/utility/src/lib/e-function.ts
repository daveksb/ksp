import {
  DEFAULT_REQUEST_TYPE_LIST,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { KspRequest } from '@ksp/shared/interface';

export function mapSchUserStatus(status: string): string {
  if (status === '1') {
    return 'ใช้งาน';
  } else return 'ไม่ใช้งาน';
}

export function getLicenseType(requestList: KspRequest[]): any {
  const teacherCount = requestList.filter(
    (item: any) => +item.careertype === SelfServiceRequestSubType.ครู
  ).length;

  const schoolManagerCount = requestList.filter(
    (item: any) =>
      +item.careertype === SelfServiceRequestSubType.ผู้บริหารสถานศึกษา
  ).length;

  const educationManagerCount = requestList.filter(
    (item: any) =>
      +item.careertype === SelfServiceRequestSubType.ผู้บริหารการศึกษา
  ).length;

  const educationConsultantCount = requestList.filter(
    (item: any) => +item.careertype === SelfServiceRequestSubType.ศึกษานิเทศก์
  ).length;

  return DEFAULT_REQUEST_TYPE_LIST.map((item) => {
    if (item.order === 1) {
      return {
        ...item,
        label: 'ครู',
        count: teacherCount,
        approve: 0,
        unApprove: 0,
        urgent: 0,
      };
    }

    if (item.licenseType === 'ผู้บริหารสถานศึกษา') {
      return {
        ...item,
        label: 'ผู้บริหารสถานศึกษา',
        count: schoolManagerCount,
        approve: 0,
        unApprove: 0,
        urgent: 0,
      };
    }

    if (item.licenseType === 'ผู้บริหารการศึกษา') {
      return {
        ...item,
        label: 'ผู้บริหารการศึกษา',
        count: educationManagerCount,
        approve: 0,
        unApprove: 0,
        urgent: 0,
      };
    }

    if (item.licenseType === 'ศึกษานิเทศก์') {
      return {
        ...item,
        label: 'ศึกษานิเทศก์',
        count: educationConsultantCount,
        approve: 0,
        unApprove: 0,
        urgent: 0,
      };
    }

    if (item.licenseType === 'ครูชาวต่างชาติ') {
      return {
        ...item,
        label: 'ครูชาวต่างชาติ',
        count: educationConsultantCount,
        approve: 0,
        unApprove: 0,
        urgent: 0,
      };
    }

    if (item.licenseType === 'KSP Bundit') {
      return {
        ...item,
        label: 'KSP Bundit',
        count: educationConsultantCount,
        approve: 0,
        unApprove: 0,
        urgent: 0,
      };
    }

    return item;
  });
}
