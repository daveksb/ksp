import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SchoolRequestType, UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createUserInfoForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
  providers: providerFactory(FormUserInfoComponent),
})
export class FormUserInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() prefixList: any[] = [];
  @Input() countryList: any[] = [];
  @Input() nationList: any[] = [];
  @Input() visaClassList: any[] = [];
  @Input() visaTypeList: any[] = [];
  @Input() displayMode!: number[];
  @Input() isqualification = false;
  @Input() isDarkMode = false;
  @Input() isSelfService = false;
  @Input() isAddStaff = false;
  @Input() KuruspaNoLabel = '';

  @Output() idCardChange = new EventEmitter<any>();

  RequestTypeEnum = SchoolRequestType;
  validatorMessages = validatorMessages;
  FormTypeEnum = UserInfoFormType;
  today = new Date().toISOString().split('T')[0];

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   *
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = createUserInfoForm(this.fb);

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
    // ถ้าเป็น form คนไทยไม่ต้อง validate field เหล่านี้
    //console.log('display mode = ', this.displayMode);
    if (this.isSelfService) {
      this.form.controls.idcardno.clearValidators();
    }

    if (this.displayMode.includes(UserInfoFormType.thai)) {
      this.form.controls.passportno.clearValidators();
      this.form.controls.passportstartdate.clearValidators();
      this.form.controls.passportenddate.clearValidators();
      this.form.controls.position.clearValidators();
    }

    if (this.displayMode.includes(UserInfoFormType.foreign)) {
      this.form.controls.idcardno.clearValidators();
      this.form.controls.workphone.clearValidators();
      this.form.controls.contactphone.clearValidators();
      this.form.controls.position.clearValidators();
      this.form.controls.sex.clearValidators();
      this.form.controls.email.clearValidators();
    }

    this.form.controls.idcardno.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((res: any) => {
        if (res && res.length === 13) {
          this.idCardChange.emit(res);
        }
      });
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
