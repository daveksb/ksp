import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  passportPattern,
  phonePattern,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
  providers: providerFactory(FormUserInfoComponent),
})
export class FormUserInfoComponent extends KspFormBaseComponent {
  @Input() isDarkMode = false;
  @Input() prefixList = null;
  @Input() foreignMode = false;
  @Input() qualificationMode = false;

  validatorMessages = validatorMessages;

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   *
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = this.fb.group({
    id: [],
    idCardNo: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    passportNo: [null, [Validators.pattern(passportPattern)]],
    passportStartDate: [],
    passportEndDate: [],
    prefixTh: [null, Validators.required],
    firstNameTh: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    middleNameTh: [],
    lastNameTh: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    prefixEn: [null, Validators.required],
    firstNameEn: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    middleNameEn: [null],
    lastNameEn: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    sex: [null, Validators.required],
    birthDate: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactPhone: [
      null,
      [Validators.required, Validators.pattern(phonePattern)],
    ],
    workPhone: [null, [Validators.required, Validators.pattern(phonePattern)]],
    nationality: ['TH'],
    country: [],
    visatype: [],
    visaclass: [],
    visaenddate: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
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
