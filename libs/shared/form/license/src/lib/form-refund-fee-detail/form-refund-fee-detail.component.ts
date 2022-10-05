import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  phonePattern,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-form-refund-fee-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-refund-fee-detail.component.html',
  styleUrls: ['./form-refund-fee-detail.component.scss'],
  providers: providerFactory(FormRefundFeeDetailComponent),
})
export class FormRefundFeeDetailComponent extends KspFormBaseComponent {
  validatorMessages = validatorMessages;

  override form = this.fb.group({
    licensetype: [],
    eduoccupytype: [],
    requestno: [],
    refundreason: [],
    otherreason: [],
    receiptNo: [{ value: null, disabled: true }],
    total: [{ value: null, disabled: true }],
    smsAlert: [],
    smsDetail: [null, Validators.pattern(phonePattern)],
    emailAlert: [],
    emailDetail: [null, Validators.email],
    bankName: [],
    bankAccount: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get smsPhone() {
    return this.form.controls.smsDetail;
  }

  get email() {
    return this.form.controls.emailDetail;
  }
}
