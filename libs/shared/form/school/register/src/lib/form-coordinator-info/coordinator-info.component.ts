import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SchoolRequestType, UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createDefaultUserInfoForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-coordinator-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.scss'],
  providers: providerFactory(FormCoordinatorInfoComponent),
})
export class FormCoordinatorInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() isDarkMode = false;
  @Input() prefixList: any[] = [];
  @Input() countryList: any[] = [];
  @Input() nationList: any[] = [];
  @Input() visaClassList: any[] = [];
  @Input() visaTypeList: any[] = [];
  @Input() isSchoolService = true;
  @Input() displayMode!: number[];

  RequestTypeEnum = SchoolRequestType;
  validatorMessages = validatorMessages;
  FormTypeEnum = UserInfoFormType;

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   *
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = createDefaultUserInfoForm(this.fb);

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
    // ถ้าเป็น form คนไทยไม่ต้อง validate field เหล่านี้
    //console.log('display mode = ', this.displayMode);
    this.form.controls.sex.clearValidators();
    this.form.controls.idcardno.clearValidators();
    this.form.controls.birthdate.clearValidators();
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
