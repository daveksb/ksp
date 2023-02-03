import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  bankAccountPattern,
  getCookie,
  phonePattern,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  KspFormBaseComponent,
  KspRequest,
  KSPRequestSelfSearchFilter,
} from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';
import { RefundReason } from '@ksp/shared/constant';
import { SelfRequestService } from '@ksp/shared/service';
import { RequestNoPipe } from '@ksp/shared/pipe';

@UntilDestroy()
@Component({
  selector: 'ksp-form-refund-fee-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RequestNoPipe],
  templateUrl: './form-refund-fee-detail.component.html',
  styleUrls: ['./form-refund-fee-detail.component.scss'],
  providers: providerFactory(FormRefundFeeDetailComponent),
})
export class FormRefundFeeDetailComponent
  extends KspFormBaseComponent
  implements OnInit
{
  validatorMessages = validatorMessages;
  RefundReason = RefundReason;
  myRequests: KspRequest[] = [];

  override form = this.fb.group({
    licensetype: [null, Validators.required],
    eduoccupytype: [null, Validators.required],
    requestno: [null, Validators.required],
    refundreason: [null, Validators.required],
    otherreason: [],
    receiptNo: [{ value: null, disabled: true }],
    total: [{ value: null, disabled: true }],
    smsAlert: [],
    smsDetail: [null, Validators.pattern(phonePattern)],
    emailAlert: [],
    emailDetail: [null, Validators.email],
    bankName: [null, Validators.required],
    bankAccount: [
      null,
      [Validators.required, Validators.pattern(bankAccountPattern)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private requestService: SelfRequestService
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.formDetect();
    const filter: KSPRequestSelfSearchFilter = {
      requesttype: null,
      requestno: null,
      requestdate: null,
      status: null,
      process: null,
      paymentstatus: null,
      idcardno: getCookie('idCardNo'),
      kuruspano: null,
      offset: '0',
      row: '500',
    };

    this.requestService.searchMyRequests(filter).subscribe((res) => {
      console.log('res = ', res);
      this.myRequests = res;
    });
  }

  formDetect() {
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
      });
  }

  get smsPhone() {
    return this.form.controls.smsDetail;
  }

  get email() {
    return this.form.controls.emailDetail;
  }

  get bankAccount() {
    return this.form.controls.bankAccount;
  }

  get keys() {
    const keys = Object.values(this.RefundReason);
    return keys.slice(keys.length / 2);
  }
}
