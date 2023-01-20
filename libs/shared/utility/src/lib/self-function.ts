import { KspRequest } from '@ksp/shared/interface';

export function SelfHasRejectedRequest(requests: KspRequest[]): KspRequest[] {
  return requests.filter((req) => {
    const condition1 = //ขอขึ้นทะเบียนหนังสืออนุญาตประกอบวิชาชีพ ตรวจสอบเอกสาร ลำดับที่ 1
      req.requesttype === '1' && req.process === '3' && req.status === '2';

    const condition2 = //ขอขึ้นทะเบียนหนังสืออนุญาตประกอบวิชาชีพ ตรวจสอบเอกสาร ลำดับที่ 2
      req.requesttype === '1' && req.process === '4' && req.status === '2';

    const condition3 = //ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ ตรวจสอบเอกสาร ลำดับที่ 1
      req.requesttype === '2' && req.process === '3' && req.status === '2';

    const condition4 = //ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ ตรวจสอบเอกสาร ลำดับที่ 2
      req.requesttype === '2' && req.process === '4' && req.status === '2';

    const condition5 = //ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ พิจารณาและรับรองคณะอนุกรรมการ
      req.requesttype === '2' && req.process === '5' && req.status === '2';

    return condition1 || condition2 || condition3 || condition4 || condition5;
  });
}
