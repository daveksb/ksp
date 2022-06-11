import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-3-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss'],
})
export class TeachingComponent implements OnInit {
  form = this.fb.group({
    rows: this.fb.array([]),
  });

  totalWeekTerm = 0;
  totalClassWeek = 0;
  totalHourTerm = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      console.log('form value = ', res.rows);

      if (res.rows) {
        this.totalWeekTerm = <number>(
          res.rows.reduce((p: any, c: any) => p + Number(c.weekTerm), 0)
        );

        this.totalClassWeek = <number>(
          res.rows.reduce((p: any, c: any) => p + Number(c.classWeek), 0)
        );

        this.totalHourTerm = <number>(
          res.rows.reduce((p: any, c: any) => p + Number(c.hourTerm), 0)
        );
      }
    });

    this.addRow();
  }

  addRow() {
    const step3Form = this.fb.group({
      term: [''],
      year: [''],
      weekTerm: [''],
      classWeek: [''],
      hourTerm: [''],
    });

    this.rows.push(step3Form);
  }

  get rows() {
    return this.form.controls['rows'] as FormArray;
  }
}
