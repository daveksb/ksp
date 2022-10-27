import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-reason-info',
  templateUrl: './form-reason-info.component.html',
  styleUrls: ['./form-reason-info.component.scss'],
  providers: providerFactory(FormReasonInfoComponent),
})
export class FormReasonInfoComponent extends KspFormBaseComponent {
  @Input() careerType = 0;

  teacherReasonList = teacherReasonList;
  schoolReasonList = schoolReasonsList;

  override form = this.fb.group({
    schoolReasons: this.fb.array([]),
    teacherReasons: this.fb.array([]),
    schoolOtherDetail: [],
    teacherOtherDetail: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.addCheckboxes();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  private addCheckboxes() {
    this.schoolReasonList.forEach(() =>
      this.schoolReasons.push(this.fb.control([null]))
    );

    this.teacherReasonList.forEach(() =>
      this.teacherReasons.push(this.fb.control([null]))
    );
  }

  get schoolReasons() {
    return this.form.controls.schoolReasons as FormArray;
  }

  get teacherReasons() {
    return this.form.controls.teacherReasons as FormArray;
  }
}

export const teacherReasonList = [
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

export const schoolReasonsList = [
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

export const schoolReasons2 = [
  {
    label:
      'ผู้ขอประกอบวิชาชีพผู้บริหารสถานศึกษา เป็นผู้มีความรู้ ความสามารถในการบริหารสถานศึกษา',
    name: 'school1',
    value: false,
  },
  {
    label:
      'ผู้ขอประกอบวิชาชีพผู้บริหารสถานศึกษา เป็นผู้มีประสบการณ์ในการบริหารสถานศึกษา',
    name: 'school2',
    value: false,
  },
  {
    label: 'ขาดแคลนผู้บริหารสถานศึกษาที่มีใบอนุญาตประกอบวิชาชีพ',
    name: 'school3',
    value: false,
  },
  {
    label: 'อื่นๆ',
    name: 'school4',
    value: false,
  },
];
