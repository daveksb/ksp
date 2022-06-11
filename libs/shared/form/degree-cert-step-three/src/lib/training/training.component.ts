import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-3-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  form = this.fb.group({
    rows: this.fb.array([]),
  });

  totalHours = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      console.log('form value = ', res.rows);

      if (res.rows) {
        this.totalHours = <number>res.rows.reduce((p, c: any) => p + c.hour, 0);
      }
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
