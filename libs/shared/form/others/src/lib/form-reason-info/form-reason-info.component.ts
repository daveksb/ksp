import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ksp-form-reason-info',
  templateUrl: './form-reason-info.component.html',
  styleUrls: ['./form-reason-info.component.scss'],
})
export class FormReasonInfoComponent implements OnInit {
  schoolFormGroup: FormGroup;
  teacherFormGroup: FormGroup;

  schoolReason = {
    ['ผู้ขอประกอบวิชาชีพครูเป็นผู้มีความรู้ ความสามารถในการสอน']: false,
    ['ผู้ขอประกอบวิชาชีพครูเป็นผู้มีประสบการณ์ ในการสอน']: false,
    ['ขาดแคลนครูผู้สอนที่มีใบอนุญาตประกอบวิชาชีพ']: false,
    ['อื่นๆ']: false,
  };

  teacherReason = {
    ['สถาบันการศึกษาที่เปิดสอนในหลักสูตรที่ คุรุสภารับรองอยู่ห่างไกลที่พักไม่สะดวกต่อการเดินทาง']:
      false,
    ['ไม่ผ่านเกณฑ์การสอบเข้าศึกษาต่อในสถาบันที่เปิดสอนในหลักสูตรที่คุรุสภารับรอง']:
      false,
    ['สถาบันการศึกษาที่เปิดสอนในหลักสูตรที่คุรุสภารับรองเปิดรับนักศึกษาจำนวนจำกัด ไม่เพียงพอต่อความต้องการ']:
      false,
    ['รูปแบบการจัดการเรียนการสอนของสถาบันการศึกษาไม่สอดคล้องกับภาระงานและภาระครอบครัว']:
      false,
    ['รายได้ไม่เพียงพอที่จะศึกษาต่อให้ได้วุฒิปริญญาทางการศึกษา']: false,
    ['อื่นๆ']: false,
  };

  constructor(private fb: FormBuilder) {
    this.schoolFormGroup = this.fb.group(this.schoolReason);
    this.teacherFormGroup = this.fb.group(this.teacherReason);
  }

  ngOnInit(): void {
    this.schoolFormGroup.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }
}
