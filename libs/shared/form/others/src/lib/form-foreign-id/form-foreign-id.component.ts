import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  Country,
  FileGroup,
  KspFormBaseComponent,
  Prefix,
} from '@ksp/shared/interface';
import {
  createUserInfoForm,
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
  override form = createUserInfoForm(this.fb);
  @Input() formHeader = 'ข้อมูลครูชาวต่างชาติ';
  @Input() passportLabel = 'หมายเลขหนังสือเดินทาง (Passport Number)';
  @Input() prefixList: Prefix[] | null = [];
  @Input() countries: Country[] | null = [];

  validatorMessages = validatorMessages;
  today = new Date();
  files: FileGroup[] = [{ name: '1.สำเนาหนังสือเดินทาง', files: [] }];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
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
    this.form.controls['position'].clearValidators();
    this.form.controls['nationality'].clearValidators();
    this.form.controls['kuruspano'].clearValidators();
  }

  prefixChanged(evt: any) {
    const prefix = evt.target?.value;

    if (prefix === '1') {
      const temp: any = { sex: '1' };
      this.form.patchValue(temp);
    } else if (['2', '3', '4', '5'].includes(prefix)) {
      const temp: any = { sex: '2' };
      this.form.patchValue(temp);
    } else {
      const temp: any = { sex: '3' };
      this.form.patchValue(temp);
    }

    const en = { prefixen: prefix };
    const th = { prefixth: prefix };
    this.form.patchValue(th);
    this.form.patchValue(en);
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
