import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KspFormBaseComponent, SchRequestProcess } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';

export interface approveResult {
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

  processTable!: SchRequestProcess | undefined;

  override form = this.fb.group({
    result: [null, Validators.required],
    shouldForward: [null, Validators.required],
    returnDate: [],
    reason: [],
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

  get shouldForward() {
    return this.form.controls.shouldForward;
  }

  ngOnInit(): void {
    this.form.controls.result.valueChanges.subscribe(() => {
      if (this.result === '2') {
        this.shouldForward.clearValidators();
      } else {
        this.shouldForward.addValidators(Validators.required);
      }
      this.shouldForward.reset();
    });
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
