import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { providerFactory } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ksp-consider-ksp-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './consider-ksp-request.component.html',
  styleUrls: ['./consider-ksp-request.component.scss'],
  providers: providerFactory(ConsiderKspRequestComponent),
})
export class ConsiderKspRequestComponent
  extends KspFormBaseComponent
  implements OnInit
{
  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  override form = this.fb.group({
    result: [null, Validators.required],
    approveNo: [],
    approveDate: [],
  });

  ngOnInit(): void {
    /* this.form.controls.approveNo.disable();
    this.form.controls.approveDate.disable();
    this.form.valueChanges.subscribe((res) => {
      this.disableForm();
    }); */
  }

 /*  disableForm() {
    if (this.result === 2) {
      this.form.controls.approveNo.enable();
      this.form.controls.approveDate.enable();
    } else {
      this.form.controls.approveNo.disable();
      this.form.controls.approveDate.disable();
    }
  }

  get result() {
    return this.form.controls.result.value;
  } */
}
