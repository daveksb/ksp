import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SchoolRequestType, UserInfoFormType } from '@ksp/shared/constant';
import {
  Country,
  KspFormBaseComponent,
  Nationality,
  Prefix,
  VisaClass,
  VisaType,
} from '@ksp/shared/interface';
import {
  createUserInfoForm,
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
  @Input() positionLabel = 'ตำแหน่ง';
  @Input() hideForm1 = false;
  @Input() hideForm2 = false;
  @Input() isSchoolService = true;
  @Input() displayMode!: number[];
  @Input() systemform = 'default';
  @Input() prefixList: Prefix[] | null = [];
  @Input() countryList: Country[] | null = [];
  @Input() nationList: Nationality[] | null = [];
  @Input() visaClassList: VisaClass[] | null = [];
  @Input() visaTypeList: VisaType[] | null = [];
  @Input() occupyList: Array<any> | null = [];

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

  override form = createUserInfoForm(this.fb);

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
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
    this.form.controls.birthdate.clearValidators();

    if (this.displayMode.includes(UserInfoFormType.thai)) {
      this.form.controls.passportno.clearValidators();
      this.form.controls.passportstartdate.clearValidators();
      this.form.controls.passportenddate.clearValidators();
      this.form.controls.position.clearValidators();
      this.form.controls.kuruspano.clearValidators();
    }
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
