import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-3-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  providers: providerFactory(TrainingComponent),
})
export class TrainingComponent extends KspFormBaseComponent implements OnInit {
  override form = this.fb.group({
    rows: this.fb.array([]),
  });

  totalHours = 0;

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
        this.totalHours = <number>(
          res.rows.reduce((p: any, c: any) => p + Number(c.hour), 0)
        );
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
