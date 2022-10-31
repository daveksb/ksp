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
  contactForm?: FormGroup;

  override form = this.fb.group({
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
    this.addData();
    this.calculateSum();
  }

  sum(source: any[], data: string): number {
    return source.reduce((p, c) => p + Number(c[data]), 0);
  }

  calculateSum() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (res.subjects) {
        this.totalCredit = this.sum(res.subjects, 'credit');
      }

      if (res.plans) {
        this.totalStudent = this.sum(res.plans, 'student');
      }

      if (res.plansResult) {
        this.totalStudentResult = this.sum(res.plansResult, 'student');
      }
    });
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
    });
  }

  newPlanResult(year: number) {
    return this.fb.group({
      label: 'แผนฯ ปีที่ ' + year,
      student: [''],
      year: [''],
      consider: [false]
    });
  }

  newSubject(data: string) {
    return this.fb.group({
      label: data,
      credit: [''],
    });
  }
}
