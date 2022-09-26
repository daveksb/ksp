import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import _ from 'lodash';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-3-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss'],
  providers: providerFactory(TeachingComponent),
})
export class TeachingComponent extends KspFormBaseComponent implements OnInit {
  override form = this.fb.group({
    rows: this.fb.array([]),
  });

  totalWeekTerm = 0;
  totalClassWeek = 0;
  totalHourTerm = 0;

  override writeValue(value: any) {
    if (value?.rows) {
      const size =
        _.size(value?.rows) - _.size(this.form.controls.rows.controls);
      new Array(size).fill(null).forEach(() => this.addRow());
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

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
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      //console.log('form value = ', res.rows);

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
