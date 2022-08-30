import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-senior-teacher-subsidy',
  templateUrl: './senior-teacher-subsidy.component.html',
  styleUrls: ['./senior-teacher-subsidy.component.scss'],
})
export class SeniorTeacherSubsidyComponent implements OnInit {
  typesOfSubject: string[] = [
    'สถานภาพ',
    'คู่สมรส',
    'บุตร',
    'ค่าใช้จ่าย',
    'รายได้ก่อนเกษียณ',
    'ทรัพย์สินของตนเองและคู่สมรส',
  ];
  constructor() {}

  ngOnInit(): void {}
}
