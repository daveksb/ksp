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

const urgentFilter = (item: KspRequest) => item.isurgent === '1';
const approveFilter = (item: KspRequest) =>
  item.process === '6' && item.status === '2';

export function getLicenseType(requestList: KspRequest[]): any {
  const teacher = requestList.filter(
    (item: any) => +item.careertype === SelfServiceRequestSubType.ครู
  );
  const teacherCount = teacher.length;

  const schoolManager = requestList.filter(
    (item: any) =>
      +item.careertype === SelfServiceRequestSubType.ผู้บริหารสถานศึกษา
  );
  const schoolManagerCount = schoolManager.length;

  const educationManager = requestList.filter(
    (item: any) =>
      +item.careertype === SelfServiceRequestSubType.ผู้บริหารการศึกษา
  );
  const educationManagerCount = educationManager.length;

  const educationConsultant = requestList.filter(
    (item: any) => +item.careertype === SelfServiceRequestSubType.ศึกษานิเทศก์
  );
  const educationConsultantCount = educationConsultant.length;

  return DEFAULT_REQUEST_TYPE_LIST.map((item) => {
    if (item.order === 1) {
      const approveCount = teacher.filter(approveFilter).length;
      return {
        ...item,
        label: 'ครู',
        count: teacherCount,
        approve: approveCount,
        unApprove: teacherCount - approveCount,
        urgent: teacher.filter(urgentFilter).length,
      };
    }

    if (item.licenseType === 'ผู้บริหารสถานศึกษา') {
      const approveCount = schoolManager.filter(approveFilter).length;
      return {
        ...item,
        label: 'ผู้บริหารสถานศึกษา',
        count: schoolManagerCount,
        approve: approveCount,
        unApprove: schoolManagerCount - approveCount,
        urgent: schoolManager.filter(urgentFilter).length,
      };
    }

    if (item.licenseType === 'ผู้บริหารการศึกษา') {
      const approveCount = educationManager.filter(approveFilter).length;
      return {
        ...item,
        label: 'ผู้บริหารการศึกษา',
        count: educationManagerCount,
        approve: approveCount,
        unApprove: educationManagerCount - approveCount,
        urgent: educationManager.filter(urgentFilter).length,
      };
    }

    if (item.licenseType === 'ศึกษานิเทศก์') {
      const approveCount = educationConsultant.filter(approveFilter).length;
      return {
        ...item,
        label: 'ศึกษานิเทศก์',
        count: educationConsultantCount,
        approve: approveCount,
        unApprove: educationConsultantCount - approveCount,
        urgent: educationConsultant.filter(urgentFilter).length,
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

export function getSummaryData(list: any[]) {
  return [
    {
      result: 'อนุมัติออกหนังสืออนุญาต',
      count: list.reduce((acc, item) => acc + item.approve, 0),
    },
    {
      result: 'ไม่อนุมัติออกหนังสืออนุญาต',
      count: list.reduce((acc, item) => acc + item.unApprove, 0),
    },
    {
      result: 'กรณีเร่งด่วนออกหนังสืออนุญาตแล้ว',
      count: list.reduce((acc, item) => acc + item.urgent, 0),
    },
  ];
}
