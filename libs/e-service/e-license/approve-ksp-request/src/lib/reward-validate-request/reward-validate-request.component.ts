import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KspFormBaseComponent, SchRequestProcess } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { ActivatedRoute } from '@angular/router';

export interface RewardApproveResult {
  result: string;
  shouldForward: boolean;
  returnDate: string;
  reason: string;
}

@Component({
  selector: 'ksp-reward-validate-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './reward-validate-request.component.html',
  styleUrls: ['./reward-validate-request.component.scss'],
  providers: providerFactory(RewardValidateRequestComponent),
})
export class RewardValidateRequestComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() requestType: string | null = '0';
  @Input() process: string | null = '0';
  @Input() showUrgent = false;
  @Input() checkMode = false;

  today = new Date();
  processTable!: SchRequestProcess | undefined;

  override form = this.fb.group({
    isurgent: [],
    result: [null, Validators.required],
    shouldForward: [null],
    returndate: [null],
    reason: [null],
    editReason: [null],
    lackReason: [null],
    reward: [null],
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
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

  get reason() {
    return this.form.controls.reason.value;
  }

  ngOnInit(): void {
    this.disabledForm();
    this.getMode();

    this.form.controls.result.valueChanges.subscribe(() => {
      if (this.result === '2') {
        this.shouldForward.clearValidators();
        this.form.controls.returndate.setValidators([Validators.required]);
        this.form.controls.returndate.enable();
        this.form.controls.reason.disable();
      } else if (this.result === '3') {
        this.shouldForward.setValidators([Validators.required]);
        this.form.controls.reason.setValidators([Validators.required]);
        this.form.controls.reason.enable();
        this.form.controls.returndate.disable();
      } else {
        this.shouldForward.addValidators(Validators.required);
        this.disabledForm();
      }
      this.resetForm();
    });
  }

  getMode() {
    this.route.url.subscribe((url) => {
      if (url[0].path === 'check-confirm') {
        this.checkMode = true;
      }
    });
  }

  disabledForm() {
    this.form.controls.reason.disable();
    this.form.controls.returndate.disable();
  }

  resetForm() {
    this.shouldForward.reset();
    this.form.controls.returndate.reset();
    this.form.controls.reason.reset();
    this.form.controls.editReason.reset();
    this.form.controls.lackReason.reset();
    this.form.controls.returndate.clearValidators();
    this.form.controls.reason.clearValidators();
  }
}
