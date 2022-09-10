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
    this.form.controls['idcardno'].clearValidators();
    this.form.controls['workphone'].clearValidators();
  }
  get idCardNo() {
    return this.form.controls.idcardno;
  }

  get passportNo() {
    return this.form.controls.passportno;
  }

  get firstNameTh() {
    return this.form.controls.firstnameth;
  }

  get lastNameTh() {
    return this.form.controls.lastnameth;
  }

  get firstNameEn() {
    return this.form.controls.firstnameen;
  }

  get lastNameEn() {
    return this.form.controls.lastnameen;
  }

  get contactPhone() {
    return this.form.controls.contactphone;
  }

  get workPhone() {
    return this.form.controls.workphone;
  }

  get email() {
    return this.form.controls.email;
  }
}
