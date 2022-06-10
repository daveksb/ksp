import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

const data = [
  {
    label: 'วิชาการศึกษาทั่วไป',
    formName: 'subject1',
  },
  {
    label: 'วิชาชีพครู : ภาคทฤษฎีและปฏิบัติ',
    formName: 'subject2',
  },
  {
    label: 'วิชาชีพครู : ฝึกปฏิบัติวิชาชีพระหว่างเรียน',
    formName: 'subject3',
  },
  {
    label: 'วิชาชีพครู : ปฏิบัติการสอนในสถานศึกษา / การบริหารสถานศึกษา',
    formName: 'subject4',
  },
  {
    label: 'วิชาเอกแรก',
    formName: 'subject5',
  },
  {
    label: 'วิชาเอกที่สองหรือวิชาโท',
    formName: 'subject6',
  },
  {
    label: 'วิชาเลือกเสรี',
    formName: 'subject7',
  },
  {
    label: 'วิชาเอก',
    formName: 'subject8',
  },
];

const temp1 = data.reduce((p, c) => ({ ...p, ...{ [c.formName]: '' } }), {});

@Component({
  selector: 'ksp-step-2-tab-1-second',
  templateUrl: './step-two-tab-one-second.component.html',
  styleUrls: ['./step-two-tab-one-second.component.scss'],
})
export class StepTwoTabOneSecondComponent implements OnInit {
  totalCredit = 0;
  totalStudent = 0;

  temp2 = {
    rows: this.fb.array([
      this.fb.group({
        label: 'aaa',
        student: [''],
        year: [''],
      }),
    ]),
  };

  form = this.fb.group({
    ...temp1,
    ...this.temp2,
  });

  data = data;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('temp = ', temp1);

    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      console.log('form value = ', res);

      if (res.rows) {
        this.totalStudent = <number>res.rows.reduce((p, c: any) => p + c.student, 0);
        console.log('stu = ', this.totalStudent);
      }
    });

    this.addRows();
  }

  /*   get data() {
    return this.form.controls['data'] as FormArray;
  } */

  addRows() {
    const arr: any = [
      this.fb.group({
        label: 'xxx',
        student: [''],
        year: [''],
      }),
      this.fb.group({
        label: 'yyy',
        student: [''],
        year: [''],
      }),
      this.fb.group({
        label: 'zzz',
        student: [''],
        year: [''],
      }),
      this.fb.group({
        label: 'ccc',
        student: [''],
        year: [''],
      }),
    ];

    arr.forEach((i: any) => this.rows.push(i));

    //this.rows.push(temp);
  }

  get rows() {
    //console.log('xxx = ', this.form.controls['rows'].controls[0]);
    return this.form.controls['rows'];
  }
}
