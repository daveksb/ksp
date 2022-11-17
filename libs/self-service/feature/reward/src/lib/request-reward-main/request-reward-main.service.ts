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
  ];
  thaiTeacherRewardFiles: FileGroup[] = [
    {
      name: '1. รางวัลอื่นและประกาศเกียรติคุณ',
      files: [],
    },
  ];
  bestTeacherRewardFiles: FileGroup[] = [
    {
      name: '1. รางวัลอื่นและประกาศเกียรติคุณ',
      files: [],
    },
  ];
  praiseRewardFiles: FileGroup[] = [
    {
      name: '1. รางวัลอื่นและประกาศเกียรติคุณ',
      files: [],
    },
  ];
  seniorTeacherRewardFiles: FileGroup[] = [
    {
      name: '1. รางวัลอื่นและประกาศเกียรติคุณ',
      files: [],
    },
  ];
  researchRewardFiles: FileGroup[] = [
    {
      name: '1. รางวัลอื่นและประกาศเกียรติคุณ',
      files: [],
    },
  ];
}
