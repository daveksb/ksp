import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  form = this.fb.group({
    hasSubsidy: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('exp form = ', res);
    });
  }

  get hasSubsidy() {
    return this.form.controls.hasSubsidy.value;
  }
}
