import { Injectable } from '@angular/core';
import { FileGroup } from '@ksp/shared/interface';

@Injectable({
  providedIn: 'root',
})
export class TempLicenseDetailService {
  verifyChoice = [
    {
      name: 'ครบถ้วน และถูกต้อง',
      value: 'complete',
    },
    {
      name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
      value: 'incomplete',
    },
  ];

  educationInfo = [
    '1.สำเนาปริญญาบัตรหรือสำเนาหนังสือรับรอง',
    '2.สำเนาใบรายนงานผลการศึกษา',
    '3.สำเนาหลักฐานการเปลี่ยนชื่อฯ (ถ้ามี)',
    '4.สำเนาหนังสือรับรองการเทียบวุฒิฯ (ถ้ามี)',
    '5.สำเนาเอกสารคำแปลวุฒิ (ถ้ามี)',
  ];

  teachingInfo = [
    '1.ตารางสอนรายบุคคล',
    '2.สำเนาสัญญาจ้าง',
    '3.หน้งสือรับรองการจ้างต่อ (ถ้ามี)',
    '4.สำเนาคำสั่งให้ไปปฏิบัติหน้าที่สอนฯ (ถ้ามี)',
  ];

  reasonInfo = [
    '1.หนังสือบันทึกชี้แจงเหตุผลคว่มจำเป็น (ถ้ามี)',
    '2.หลักฐานการพัฒนาตนเอง',
  ];

  evidenceFiles: FileGroup[] = [
    {
      name: '1.สำเนาสัญญาจ้าง',
      files: [],
    },
  ];

  /* reason = [
    [
      'เลขบัตรประชาชนไม่ถูกต้อง',
      'คำนำหน้าไม่ถูกต้อง',
      'ชื่อภาษาไทยไม่ถูกต้อง',
      'ชื่อภาษาอังกฤษไม่ถูกต้อง',
      'นามสกุลภาษาไทยไม่ถูกต้อง',
      'นามสกุลภาษาอังกฤษไม่ถูกต้อง',
      'อื่นๆ (ระบุ)',
    ],
    [],
    [
      'ชื่อปริญญา/หลักสูตรไม่ถูกต้อง',
      'สาขา/วิชาเอกไม่ถูกต้อง',
      'สถาบันการศึกษาไม่ถูกต้อง',
      'ประเทศไม่ถูกต้อง',
      'วันเดือนปี เข้าศึกษาไม่ถูกต้อง',
      'วันเดือนปี สำเร็จการศึกษาไม่ถูกต้อง',
      'อื่นๆ (ระบุ)',
    ],
    [
      'ระบุชื่อวิชาไม่ตรงกับตารางสอน',
      'ระบุช่วงชั้นที่สอนไม่ตรงกับตารางสอน',
      'ระบุตำแหน่งไม่ถูกต้องตามสัญญาจ้าง',
      'ระบุเลขที่สัญญาจ้างไม่ถูกต้อง',
      'ระบุวันเริ่มปฏิบัติงานไม่ถูกต้อง',
      'ระบุวันสิ้นสุดการปฏิบัติงานไม่ถูกต้อง',
      'ระบุระยะเวลาปีที่จ้างไม่ถูกต้อง',
      'ระบุระยะเวลาเดือนที่จ้างไม่ถูกต้อง',
      'อื่นๆ (ระบุ)',
    ],
    [
      'ไม่ชี้แจงเหตุผลความจำเป็นของสถานศึกษาที่ต้องรับผู้ไม่มีใบอนุญาตประกอบวิชาชีพ',
      'ไม่ชี้แจงเหตุผลที่ไม่สามารถพัฒนาตนเองได้ตามระยะเวลาที่คุรุสภากำหนด',
      'ขอเอกสารการพํฒนาตนเองเพิ่ม',
      'อื่นๆ (ระบุ)',
    ],
  ]; */
}
