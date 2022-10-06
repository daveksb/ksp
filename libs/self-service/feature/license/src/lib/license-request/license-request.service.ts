import { Injectable } from '@angular/core';
import { AttachFile } from '@ksp/shared/constant';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
  educationFiles: AttachFile[] = [
    {
      name: 'สำเนาใบรายงานผลการศึกษา (Transcript)',
      files: [],
    },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      files: [],
    },
  ];

  experienceFiles: AttachFile[] = [
    {
      name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
      files: [],
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      files: [],
    },
    {
      name: 'สำเนาตารางสอนรายสัปดาห์',
      files: [],
    },
    {
      name: 'สำเนาคำสั่งแต่งตั้งปฏิบติหน้าที่',
      files: [],
    },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      files: [],
    },
  ];
}
