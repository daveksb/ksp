import { Injectable } from '@angular/core';
import { FileGroup } from '@ksp/shared/interface';

@Injectable({
  providedIn: 'root',
})
export class RequestRewardMainService {
  /* councilRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', fileid: '', filename: '' },
  ];

  thaiTeacherRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', fileid: '', filename: '' },
  ];

  bestTeacherRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', fileid: '', filename: '' },
  ];

  praiseRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', fileid: '', filename: '' },
  ];

  seniorTeacherRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', fileid: '', filename: '' },
  ];

  researchRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', fileid: '', filename: '' },
  ]; */

  councilRewardFiles: FileGroup[] = [
    {
      name: '1. รางวัลอื่นและประกาศเกียรติคุณ',
      files: [],
    },
    {
      name: '2. แบบรายงานประวัติและผลงาน',
      files: [],
    },
    {
      name: '3. กพ.7 หรือสมุดประจำตัว',
      files: [],
    },
  ];

  thaiTeacherRewardFiles: FileGroup[] = [
    {
      name: '1. แบบรายงานประวัติและผลงาน',
      files: [],
    },
    {
      name: '2. แผนการจัดการเรียนรู้หรือ มคอ.3 และ มคอ.5',
      files: [],
    },
  ];

  bestTeacherRewardFiles: FileGroup[] = [
    {
      name: '1. แบบรายงานประวัติและผลงานนวัตกรรม',
      files: [],
    },
    {
      name: '2. แผนการจัดการเรียนรู้หรือแผนการจัดประสบการณ์',
      files: [],
    },
  ];

  praiseRewardFiles: FileGroup[] = [
    {
      name: '1. แบบรายงานประวัติและผลงาน',
      files: [],
    },
    {
      name: '2. กพ7 หรือ สมุดประจำตัวครู',
      files: [],
    },
  ];

  seniorTeacherRewardFiles: FileGroup[] = [
    {
      name: '1. สำเนาบัตรประชาชน',
      files: [],
    },
    {
      name: '2. กพ.7',
      files: [],
    },
    {
      name: '3. แบบคำขอที่ผู้บังคับบัญชาลงนาม (มอ.1)',
      files: [],
    },
    {
      name: '4. แบบคำขอที่ผู้บังคับบัญชาลงนาม (มอ.2)',
      files: [],
    },
  ];

  researchRewardFiles: FileGroup[] = [
    {
      name: '1. เล่มรายงานการวิจัย',
      files: [],
    },
    {
      name: '2. แบบแสดงความจำนงค์',
      files: [],
    },
    {
      name: '3. แบบ วจ2 (กรณีประเภททีม) ',
      files: [],
    },
    {
      name: '4. การตรวจการคัดลอกงานวิชาการ',
      files: [],
    },
  ];
}
