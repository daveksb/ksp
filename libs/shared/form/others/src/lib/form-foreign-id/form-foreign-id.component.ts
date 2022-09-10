import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createDefaultUserForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-form-foreign-id',
  templateUrl: './form-foreign-id.component.html',
  styleUrls: ['./form-foreign-id.component.scss'],
  providers: providerFactory(FormForeignIdComponent),
})
export class FormForeignIdComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = createDefaultUserForm(this.fb, Validators);
  validatorMessages = validatorMessages;

  @Input() formHeader = 'ข้อมูลครูชาวต่างชาติ';
  @Input() prefixList: any;
  @Input() countries: any;
  @Input() visaTypeList: any;

  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((value: any) => {
          this.onChange(value);
          this.onTouched();
        })
    );
  }
  ngOnInit(): void {
    this.form.controls['idCardNo'].clearValidators();
    this.form.controls['workPhone'].clearValidators();
  }
  get idCardNo() {
    return this.form.controls.idCardNo;
  }

  get passportNo() {
    return this.form.controls.passportNo;
  }

  get firstNameTh() {
    return this.form.controls.firstNameTh;
  }

  get lastNameTh() {
    return this.form.controls.lastNameTh;
  }

  get firstNameEn() {
    return this.form.controls.firstNameEn;
  }

  get lastNameEn() {
    return this.form.controls.lastNameEn;
  }

  get contactPhone() {
    return this.form.controls.contactPhone;
  }

  get workPhone() {
    return this.form.controls.workPhone;
  }

  get email() {
    return this.form.controls.email;
  }
}
