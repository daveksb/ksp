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
  implements OnInit
{
  @Input() uniType: Array<any> = [];
  @Input() prefixName: Array<any> = [];
  @Input() occupyList: Array<any> = [];
  @Input() displayMode!: number[];
  validatorMessages = validatorMessages;
  educationOccupy: any = {
    permission: '',
    other: '',
    affiliation: '',
  };
  permissionList: Array<any> = uniPermissionList;

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

  ngOnInit(): void {
    // ถ้าเป็น form คนไทยไม่ต้อง validate field เหล่านี้
    //console.log('display mode = ', this.displayMode);
    if (this.displayMode.includes(UserInfoFormType.thai)) {
      this.form.controls.position.clearValidators();
    }

    if (this.displayMode.includes(UserInfoFormType.foreign)) {
      this.form.controls.idcardno.clearValidators();
      this.form.controls.workphone.clearValidators();
      this.form.controls.contactphone.clearValidators();
      this.form.controls.position.clearValidators();
      this.form.controls.email.clearValidators();
    }
  }

  chageposition(event: any) {
    if (event.target.value == '0') {
      this.form.controls['other'].setValidators([Validators.required]);
    } else {
      this.form.controls['other'].clearValidators();
      this.form.patchValue({
        other: null,
      });
    }
    this.form.controls['other'].updateValueAndValidity();
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
}
