import { Injectable } from '@angular/core';
import {
  CourseFormFourComponent,
  CourseFormOneComponent,
  CourseFormThreeComponent,
  CourseFormTwoComponent,
} from '@ksp/shared/form/uni-course-form';
import { ListData } from '@ksp/shared/interface';

@Injectable({
  providedIn: 'any',
})
export class DegreeCertStepOneService {
  constructor() {}

  degreeTypes: ListData[] = [
    {
      value: 0,
      label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    },
    {
      value: 1,
      label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
    },
    {
      value: 2,
      label: 'ประกาศนียบัตรบัณฑิตทางการศึกษา (วิชาชีพครู)',
    },
    {
      value: 3,
      label: 'ประกาศนียบัตรบัณฑิตทางการศึกษา (วิชาชีพบริหาร)',
    },
    {
      value: 4,
      label: 'ปริญญาโททางการศึกษา (วิชาชีพครู)',
    },
    {
      value: 5,
      label: 'ปริญญาโททางการศึกษา (วิชาชีพบริหาร)',
    },
    {
      value: 6,
      label: 'ปริญญาเอกทางการศึกษา (วิชาชีพครู)',
    },
    {
      value: 7,
      label: 'ปริญญาเอกทางการศึกษา (วิชาชีพบริหาร)',
    },
  ];

  courseTypes: ListData[] = [
    {
      value: 0,
      label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
    },
    {
      value: 1,
      label: 'เอกเดี่ยว กรณีไม่มีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
    },
    {
      value: 2,
      label: 'เอกเดี่ยว กรณีมีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
    },
    {
      value: 3,
      label: 'เอกคู่',
    },
    {
      value: 4,
      label: 'เอก-โท',
    },
  ];

  componentList = [
    CourseFormOneComponent,
    CourseFormTwoComponent,
    CourseFormThreeComponent,
    CourseFormFourComponent,
    CourseFormOneComponent,
  ];
}
