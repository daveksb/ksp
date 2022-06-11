import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-tab-1',
  templateUrl: './course-type-one.component.html',
  styleUrls: ['./course-type-one.component.scss'],
})
export class CourseTypeOneComponent implements OnInit {
  creditSums: number[] = [];
  yearSums: number[] = [0];
  planSums: number[] = [];

  defaultSubject = {
    subjects: this.fb.array([
      this.fb.group({
        label: 'หมวดวิชาบังคับ',
        credit1: [''],
        credit2: [''],
        credit3: [''],
      }),
    ]),
  };

  defaultPlan = {
    plans: this.fb.array([
      this.fb.group({
        label: 'แผนฯ ปีที่ 1',
        year: [''],
        student1: [''],
        student2: [''],
        student3: [''],
      }),
    ]),
  };

  form = this.fb.group({
    subject1GroupName: [''],
    subject2GroupName: [''],
    subject3GroupName: [''],
    ...this.defaultPlan,
    ...this.defaultSubject,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (res.subjects) {
        this.creditSums[0] = this.creditSum(res.subjects, 'credit1');
        this.creditSums[1] = this.creditSum(res.subjects, 'credit2');
        this.creditSums[2] = this.creditSum(res.subjects, 'credit3');
      }
      if (res.plans) {
        this.planSums[0] = this.creditSum(res.plans, 'student1');
        this.planSums[1] = this.creditSum(res.plans, 'student2');
        this.planSums[2] = this.creditSum(res.plans, 'student3');
        this.planSums[3] =
          this.planSums[0] + this.planSums[1] + this.planSums[2];

        res.plans.forEach((i, index) => {
          const temp: any = i;
          const { label, year, ...newData } = temp;

          let sum = 0;

          for (const property in newData) {
            sum = sum + Number(newData[property]);
          }
          this.yearSums[index] = sum;
          //console.log(`res = ${index}`, sum);
        });
      }
    });
    this.addData();
  }

  creditSum(source: any[], data: string): number {
    return source.reduce((p: any, c: any) => p + Number(c[data]), 0);
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
        year: [''],
        student1: [''],
        student2: [''],
        student3: [''],
      });
    };

    const newSubject = (data: string) => {
      return this.fb.group({
        label: data,
        credit1: [''],
        credit2: [''],
        credit3: [''],
      });
    };

    const subjects: any = [
      newSubject('หมวดวิชาเลือก'),
      newSubject('วิทยานิพนธ์'),
      newSubject('การค้นคว้าอิสระ'),
      newSubject('รายวิชาเสริม'),
      newSubject('วิชาอื่นๆ'),
    ];

    const plans: any = [newPlan(2), newPlan(3), newPlan(4), newPlan(5)];

    plans.forEach((i: any) => this.plans.push(i));
    subjects.forEach((i: any) => this.subjects.push(i));
  }
}
