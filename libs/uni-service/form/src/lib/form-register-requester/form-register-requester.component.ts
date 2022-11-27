import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { uniPermissionList, UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createUniUserInfoForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

@Component({
  selector: 'uni-form-register-requester',
  templateUrl: './form-register-requester.component.html',
  styleUrls: ['./form-register-requester.component.scss'],
  providers: providerFactory(FormRegisterRequesterInfoComponent),
})
export class FormRegisterRequesterInfoComponent
  extends KspFormBaseComponent
{
  @Input() uniType: Array<any> = [];
  @Input() prefixName: Array<any> = [];
  @Input() occupyList: Array<any> = [];
  @Input() displayMode!: number[];
  @Input() isSubmit = false;
  validatorMessages = validatorMessages;
  educationOccupy: any = {
    permission: '',
    other: '',
    affiliation: '',
  };
  permissionList: Array<any> = uniPermissionList;
  validIdcard = true;
  validprefix = true;

  override form = createUniUserInfoForm(this.fb);

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

  checkID(event: any) {
    const id = event?.target.value;
    if (id.length != 13) {
      this.validIdcard = false;
      return;
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(id.charAt(i)) * (13 - i);
    }
    const mod = sum % 11;
    const check = (11 - mod) % 10;
    if (check == parseInt(id.charAt(12))) {
      this.validIdcard = true;
    } else {
      this.validIdcard = false;
    }
  }

  changePrefix(event: any) {
    if ((this.form.controls.prefixth && this.form.controls.prefixen) &&
      (this.form.controls.prefixth.value != this.form.controls.prefixen.value) &&
      (this.form.controls.prefixth.value != '0' && this.form.controls.prefixen.value != '0')) {
      this.validprefix = false;
    } else {
      this.validprefix = true;
    }
  }

  get idCardNo() {
    return this.form.controls.idcardno;
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

  get position() {
    return this.form.controls.position;
  }

  get prefixth() {
    return this.form.controls.prefixth;
  }

  get prefixen() {
    return this.form.controls.prefixen;
  }

  get permission() {
    return this.form.controls.permission;
  }
}
