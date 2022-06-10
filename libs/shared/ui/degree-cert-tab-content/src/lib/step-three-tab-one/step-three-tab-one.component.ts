import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-3-tab-1',
  templateUrl: './step-three-tab-one.component.html',
  styleUrls: ['./step-three-tab-one.component.scss'],
})
export class StepThreeTabOneComponent implements OnInit {
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
      year: [''],
      term: [''],
      hour: [''],
    });

    this.rows.push(step3Form);
  }

  get rows() {
    return this.form.controls['rows'] as FormArray;
  }

  
}
