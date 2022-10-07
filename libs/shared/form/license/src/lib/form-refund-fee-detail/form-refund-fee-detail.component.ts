import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-form-refund-fee-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-refund-fee-detail.component.html',
  styleUrls: ['./form-refund-fee-detail.component.scss'],
  providers: providerFactory(FormRefundFeeDetailComponent),
})
export class FormRefundFeeDetailComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    licensetype: [null, Validators.required],
    eduoccupytype: [null, Validators.required],
    requestno: [null, Validators.required],
    refundreason: [null, Validators.required],
    otherreason: [],
    receiptNo: [{ value: null, disabled: true }],
    total: [{ value: null, disabled: true }],
    smsAlert: [],
    smsDetail: [],
    emailAlert: [],
    emailDetail: [],
    bankName: [null, Validators.required],
    bankAccount: [null, Validators.required],
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

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.smsAlert !== next.smsAlert) {
          if (next.smsAlert) {
            this.form.controls.smsDetail.addValidators(Validators.required);
          } else {
            this.form.controls.smsDetail.clearValidators();
          }
          this.form.controls.smsDetail.updateValueAndValidity();
        }

        if (prev.emailAlert !== next.emailAlert) {
          if (next.emailAlert) {
            this.form.controls.emailDetail.addValidators(Validators.required);
          } else {
            this.form.controls.emailDetail.clearValidators();
          }
          this.form.controls.emailDetail.updateValueAndValidity();
        }
        //console.log('exp form = ', res);
      });
  }
}
