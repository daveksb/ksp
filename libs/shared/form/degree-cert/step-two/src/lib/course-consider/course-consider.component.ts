import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMode, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-course-consider',
  templateUrl: './course-consider.component.html',
  styleUrls: ['./course-consider.component.css'],
  providers: providerFactory(CourseConsiderComponent),
})

export class CourseConsiderComponent extends KspFormBaseComponent implements OnInit {
  totalCredit = 0;
  totalStudent = 0;
  totalStudentResult = 0;
  creditSums: number[] = [0, 0, 0];
  yearSums: number[] = [0, 0, 0, 0, 0, 0];
  planSums: number[] = [0, 0, 0, 0];
  newPlanSums: number[] = [0, 0, 0];
  contactForm?: FormGroup;
  @Input() degreeType = '';

  override form = this.fb.group({
    subject1GroupName: [''],
    subject2GroupName: [''],
    subject3GroupName: [''],
    plans: this.fb.array([this.newPlan(1)]),
    plansResult: this.fb.array([this.newPlanResult(1)]),
    subjects: this.fb.array([this.newSubject('วิชาการศึกษาทั่วไป')]),
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
    if (this.degreeType == 'a') {
      this.addData();
    } else {
      this.addDataTypeB();
    }
    this.calculateSum();
  }

  sum(source: any[], data: string): number {
    return source.reduce((p, c) => p + Number(c[data]), 0);
  }

  calculateSum() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (this.degreeType == 'a') {
        if (res.subjects) {
          this.totalCredit = this.sum(res.subjects, 'credit');
        }
  
        if (res.plans) {
          this.totalStudent = this.sum(res.plans, 'student');
        }
  
        if (res.plansResult) {
          this.totalStudentResult = this.sum(res.plansResult, 'student');
        }
      } else {
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
          const results = this.form.controls.plansResult.getRawValue() as any;
          this.newPlanSums[0] = results.reduce((p: any, c: any) => p + Number(c['student1']), 0);
          this.newPlanSums[1] = results.reduce((p: any, c: any) => p + Number(c['student2']), 0);
          this.newPlanSums[2] = results.reduce((p: any, c: any) => p + Number(c['student3']), 0);
          res.plans.forEach((i, index) => {
            const { label, year, ...newData } = i as any;
            let sum = 0;
            for (const property in newData) {
              sum += Number(newData[property]);
            }
            this.yearSums[index] = sum;
          });
        }
      }
    });
  }

  creditSum(source: any[], data: string): number {
    return source.reduce((p, c) => p + Number(c[data]), 0);
  }

  get plans() {
    return this.form.controls['plans'];
  }

  get plansResult() {
    return this.form.controls['plansResult'];
  }

  get subjects() {
    return this.form.controls['subjects'];
  }

  addDataTypeB() {
    const subjects = [
      this.newSubject('วิชาชีพครู : ภาคทฤษฎีและปฏิบัติ'),
      this.newSubject('วิชาชีพครู : ฝึกปฏิบัติวิชาชีพระหว่างเรียน'),
      this.newSubject(
        'วิชาชีพครู : ปฏิบัติการสอนในสถานศึกษา / การบริหารสถานศึกษา'
      ),
      this.newSubject('วิชาเอกแรก'),
      this.newSubject('วิชาเอกที่สองหรือวิชาโท'),
    ];

    const plans = [
      this.newPlan(2),
      this.newPlan(3),
      this.newPlan(4),
      this.newPlan(5),
    ];

    const plansResult = [
      this.newPlanResult(2),
      this.newPlanResult(3),
      this.newPlanResult(4),
      this.newPlanResult(5),
    ];

    plans.forEach((p) => this.plans.push(p));
    plansResult.forEach((pr) => this.plansResult.push(pr));
    subjects.forEach((s) => this.subjects.push(s));
    if (this.mode === 'view') this.form.disable();
  }

  addData() {
    const subjects = [
      this.newSubject('วิชาชีพครู : ภาคทฤษฎีและปฏิบัติ'),
      this.newSubject('วิชาชีพครู : ฝึกปฏิบัติวิชาชีพระหว่างเรียน'),
      this.newSubject(
        'วิชาชีพครู : ปฏิบัติการสอนในสถานศึกษา / การบริหารสถานศึกษา'
      ),
      this.newSubject('วิชาเอกแรก'),
      this.newSubject('วิชาเอกที่สองหรือวิชาโท'),
      this.newSubject('วิชาเลือกเสรี'),
      this.newSubject('วิชาเอก'),
    ];

    const plans = [
      this.newPlan(2),
      this.newPlan(3),
      this.newPlan(4),
      this.newPlan(5),
    ];

    const plansResult = [
      this.newPlanResult(2),
      this.newPlanResult(3),
      this.newPlanResult(4),
      this.newPlanResult(5),
    ];

    plans.forEach((p) => this.plans.push(p));
    plansResult.forEach((pr) => this.plansResult.push(pr));
    subjects.forEach((s) => this.subjects.push(s));
    if (this.mode === 'view') this.form.disable();
  }

  newPlan(year: number) {
    return this.fb.group({
      label: 'แผนฯ ปีที่ ' + year,
      student: [''],
      year: [''],
      student1: [''],
      student2: [''],
      student3: [''],
    });
  }

  newPlanResult(year: number) {
    return this.fb.group({
      label: 'แผนฯ ปีที่ ' + year,
      student: [''],
      year: [''],
      consider: [false],
      student1: [''],
      student2: [''],
      student3: [''],
    });
  }

  newSubject(data: string) {
    return this.fb.group({
      label: data,
      credit: [''],
      credit1: [''],
      credit2: [''],
      credit3: [''],
    });
  }
}
