import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormMode } from '@ksp/shared/interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-tab-1-b',
  templateUrl: './course-type-b.component.html',
  styleUrls: ['./course-type-b.component.scss'],
})
export class CourseTypeBComponent implements OnInit {
  @Input() mode: FormMode = 'edit';

  creditSums: number[] = [0, 0, 0];
  yearSums: number[] = [0, 0, 0, 0, 0, 0];
  planSums: number[] = [0, 0, 0, 0];

  defaultSubject = {
    subjects: this.fb.array([this.newSubject('หมวดวิชาบังคับ')]),
  };

  defaultPlan = {
    plans: this.fb.array([this.newPlan(1)]),
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
    this.addData();
    this.calculateSum();
  }

  newPlan(year: number) {
    return this.fb.group({
      label: 'แผนฯ ปีที่ ' + year,
      year: [''],
      student1: [''],
      student2: [''],
      student3: [''],
    });
  }

  newSubject(data: string) {
    return this.fb.group({
      label: data,
      credit1: [''],
      credit2: [''],
      credit3: [''],
    });
  }

  calculateSum() {
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
          const { label, year, ...newData } = i as any;
          let sum = 0;
          for (const property in newData) {
            sum += Number(newData[property]);
          }
          this.yearSums[index] = sum;
          //console.log(`res = ${index}`, sum);
        });
      }
    });
  }

  creditSum(source: any[], data: string): number {
    return source.reduce((p, c) => p + Number(c[data]), 0);
  }

  get plans() {
    return this.form.controls['plans'];
  }

  get subjects() {
    return this.form.controls['subjects'];
  }

  addData() {
    const subjects = [
      this.newSubject('หมวดวิชาเลือก'),
      this.newSubject('วิทยานิพนธ์'),
      this.newSubject('การค้นคว้าอิสระ'),
      this.newSubject('รายวิชาเสริม'),
      this.newSubject('วิชาอื่นๆ'),
    ];

    const plans = [
      this.newPlan(2),
      this.newPlan(3),
      this.newPlan(4),
      this.newPlan(5),
    ];

    plans.forEach((i) => this.plans.push(i));
    subjects.forEach((i) => this.subjects.push(i));
    if (this.mode === 'view') this.form.disable();
  }
}
