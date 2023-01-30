import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KspFormBaseComponent, SchRequestProcess } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';

export interface ApproveResult {
  result: string;
  shouldForward: string;
  returnDate: string;
  reason: string;
}

@Component({
  selector: 'ksp-validate-ksp-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './validate-ksp-request.component.html',
  styleUrls: ['./validate-ksp-request.component.scss'],
  providers: providerFactory(ValidateKspRequestComponent),
})
export class ValidateKspRequestComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() requestType: string | null = '0';
  @Input() process: string | null = '0';
  @Input() showUrgent = false;

  today = new Date();
  processTable!: SchRequestProcess | undefined;

  override form = this.fb.group({
    result: [null, Validators.required],
    returndate: [null],
    reason: [null],
    otherDetail: [null],
    isurgent: [],
    //shouldForward: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get result() {
    return this.form.controls.result.value;
  }

  /*   get shouldForward() {
    return this.form.controls.shouldForward;
  } */

  get reason() {
    return this.form.controls.reason.value;
  }

  ngOnInit(): void {
    this.disabledForm();

    this.form.controls.result.valueChanges.subscribe(() => {
      if (this.result === '2') {
        //this.shouldForward.clearValidators();
        this.form.controls.returndate.setValidators([Validators.required]);
        this.form.controls.returndate.enable();
        this.form.controls.reason.disable();
      } else if (this.result === '3') {
        //this.shouldForward.setValidators([Validators.required]);
        this.form.controls.reason.setValidators([Validators.required]);
        this.form.controls.reason.enable();
        this.form.controls.returndate.disable();
      } else {
        //this.shouldForward.addValidators(Validators.required);
        this.disabledForm();
      }
      this.resetForm();
    });
  }

  disabledForm() {
    this.form.controls.reason.disable();
    this.form.controls.returndate.disable();
  }

  resetForm() {
    //this.shouldForward.reset();
    this.form.controls.returndate.reset();
    this.form.controls.reason.reset();
    this.form.controls.otherDetail.reset();
    this.form.controls.returndate.clearValidators();
    this.form.controls.reason.clearValidators();
  }

  /*   ngOnChanges(changes: SimpleChanges): void {
    //console.log('change = ', changes);
    this.processTable = SchoolRequestProcess.find(
      (p) =>
        p.processId === +changes['process'].currentValue &&
        p.requestType === +changes['requestType'].currentValue
    );
    //console.log('process table = ', this.processTable);
  } */
}
