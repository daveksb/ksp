import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-3-tab-2',
  templateUrl: './step-three-tab-two.component.html',
  styleUrls: ['./step-three-tab-two.component.scss'],
})
export class StepThreeTabTwoComponent implements OnInit {
  form = this.fb.group({
    rows: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      console.log('form value = ', res);
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
