import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-reason-info',
  templateUrl: './form-reason-info.component.html',
  styleUrls: ['./form-reason-info.component.scss'],
  providers: providerFactory(FormReasonInfoComponent),
})
export class FormReasonInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  teacherReason = teacherReasons;
  schoolReason = schoolReasons;

  override form = this.fb.group({
    schoolReasonInfo: [],
    school1: [false],
    school2: [false],
    school3: [false],
    school4: [false],
    schoolOtherDetail: [],
    teacherReasonInfo: [],
    teacher1: [false],
    teacher2: [false],
    teacher3: [false],
    teacher4: [false],
    teacher5: [false],
    teacher6: [false],
    teacherOtherDetail: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('res = ', res);
    });
  }
}

export const teacherReasons = [
  {
    label:
      'สถาบันการศึกษาที่เปิดสอนในหลักสูตรที่ คุรุสภารับรองอยู่ห่างไกลที่พักไม่สะดวกต่อการเดินทาง',
    name: 'teacher1',
    value: false,
  },
  {
    label:
      'ไม่ผ่านเกณฑ์การสอบเข้าศึกษาต่อในสถาบันที่เปิดสอนในหลักสูตรที่คุรุสภารับรอง',
    name: 'teacher2',
    value: false,
  },
  {
    label:
      'สถาบันการศึกษาที่เปิดสอนในหลักสูตรที่คุรุสภารับรองเปิดรับนักศึกษาจำนวนจำกัด ไม่เพียงพอต่อความต้องการ',
    name: 'teacher3',
    value: false,
  },
  {
    label:
      'รูปแบบการจัดการเรียนการสอนของสถาบันการศึกษาไม่สอดคล้องกับภาระงานและภาระครอบครัว',
    name: 'teacher4',
    value: false,
  },

  {
    label: 'รายได้ไม่เพียงพอที่จะศึกษาต่อให้ได้วุฒิปริญญาทางการศึกษา',
    name: 'teacher5',
    value: false,
  },
  { label: 'อื่นๆ', name: 'teacher6', value: false },
];

export const schoolReasons = [
  {
    label: 'ผู้ขอประกอบวิชาชีพครูเป็นผู้มีความรู้ ความสามารถในการสอน',
    name: 'school1',
    value: false,
  },
  {
    label: 'ผู้ขอประกอบวิชาชีพครูเป็นผู้มีประสบการณ์ ในการสอน',
    name: 'school2',
    value: false,
  },
  {
    label: 'ขาดแคลนครูผู้สอนที่มีใบอนุญาตประกอบวิชาชีพ',
    name: 'school3',
    value: false,
  },
  {
    label: 'อื่นๆ',
    name: 'school4',
    value: false,
  },
];
