import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-tab-1-second',
  templateUrl: './step-two-tab-one-second.component.html',
  styleUrls: ['./step-two-tab-one-second.component.scss'],
})
export class StepTwoTabOneSecondComponent implements OnInit {
  totalCredit = 0;
  totalStudent = 0;

  defaultSubject = {
    subjects: this.fb.array([
      this.fb.group({
        label: 'วิชาการศึกษาทั่วไป',
        credit: [''],
      }),
    ]),
  };

  defaultPlan = {
    plans: this.fb.array([
      this.fb.group({
        label: 'แผนฯ ปีที่ 1',
        student: [''],
        year: [''],
      }),
    ]),
  };

  form = this.fb.group({
    ...this.defaultPlan,
    ...this.defaultSubject,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (res.subjects) {
        this.totalCredit = <number>(
          res.subjects.reduce((p, c: any) => p + c.credit, 0)
        );
      }

      if (res.plans) {
        this.totalStudent = <number>(
          res.plans.reduce((p, c: any) => p + c.student, 0)
        );
      }
    });
    this.addData();
  }

  get plans() {
    return this.form.controls['plans'];
  }

  get subjects() {
    return this.form.controls['subjects'];
  }

  addData() {
    const newPlan = (year: number) => {
      return this.fb.group({
        label: 'แผนฯ ปีที่ ' + year,
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
      newSubject('วิชาชีพครู : ภาคทฤษฎีและปฏิบัติ'),
      newSubject('วิชาชีพครู : ฝึกปฏิบัติวิชาชีพระหว่างเรียน'),
      newSubject('วิชาชีพครู : ปฏิบัติการสอนในสถานศึกษา / การบริหารสถานศึกษา'),
      newSubject('วิชาเอกแรก'),
      newSubject('วิชาเอกที่สองหรือวิชาโท'),
      newSubject('วิชาเลือกเสรี'),
      newSubject('วิชาเอก'),
    ];

    const plans: any = [newPlan(2), newPlan(3), newPlan(4), newPlan(5)];

    plans.forEach((i: any) => this.plans.push(i));
    subjects.forEach((i: any) => this.subjects.push(i));
  }
}
