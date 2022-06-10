import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ksp-step-3-tab-1',
  templateUrl: './step-three-tab-one.component.html',
  styleUrls: ['./step-three-tab-one.component.scss'],
})
export class StepThreeTabOneComponent implements OnInit {
  step3Form = this.fb.group({
    rows: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.step3Form.valueChanges.subscribe((res) => {
      console.log('form value = ', res);
    });
  }

  addRow() {
    const step3Form: any = this.fb.group({
      years: [''],
      terms: [''],
      hours: [''],
    });

    this.rows.push(step3Form);
  }

  get rows() {
    return this.step3Form.controls['rows'];
  }
}
