import { Injectable } from '@angular/core';
import { FileGroup } from '@ksp/shared/constant';

@Injectable({
  providedIn: 'root',
})
export class RequestRewardMainService {
  councilRewardFiles: FileGroup[] = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', files: [] },
  ];

  thaiTeacherRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', files: [] },
  ];

  bestTeacherRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', files: [] },
  ];

  praiseRewardFiles = [{ name: '1. รางวัลอื่นและประกาศเกียรติคุณ', files: [] }];

  seniorTeacherRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', files: [] },
  ];

  researchRewardFiles = [
    { name: '1. รางวัลอื่นและประกาศเกียรติคุณ', files: [] },
  ];
}
