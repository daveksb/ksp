import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

//const temp1 = data.reduce((p, c) => ({ ...p, ...{ [c.formName]: '' } }), {});

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

  temp3 = {
    subjects: this.fb.array([
      this.fb.group({
        label: 'aaa',
        credit: [''],
      }),
    ]),
  };

  form = this.fb.group({
    ...this.temp2,
    ...this.temp3,
  });

  data = data;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      console.log('form value = ', res);

      if (res.rows) {
        this.totalStudent = <number>(
          res.rows.reduce((p, c: any) => p + c.student, 0)
        );
        console.log('stu = ', this.totalStudent);
      }
    });

    this.addRows();
  }

  get rows() {
    return this.form.controls['rows'];
  }

  get subjects() {
    return this.form.controls['subjects'];
  }

  addRows() {
    const newRow = (data: string) => {
      return this.fb.group({
        label: data,
        student: [''],
        year: [''],
      });
    };

    const newSubject = (data: string) => {
      return this.fb.group({
        label: data,
        credit: [''],
      });
    };

    const subjects: any = [
      newSubject('kkk'),
      newSubject('lll'),
      newSubject('mmm'),
    ];

    const rows: any = [newRow('aa'), newRow('bb'), newRow('cc')];

    rows.forEach((i: any) => this.rows.push(i));
    subjects.forEach((i: any) => this.subjects.push(i));
  }
}
