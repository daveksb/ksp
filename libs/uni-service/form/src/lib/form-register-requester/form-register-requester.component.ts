import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import {
  createUniUserInfoForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { uniPermissionList } from 'libs/shared/constant/src/school-request-constant';
import { Observable } from 'rxjs';


@Component({
  selector: 'uni-form-register-requester',
  templateUrl: './form-register-requester.component.html',
  styleUrls: ['./form-register-requester.component.scss'],
  providers: providerFactory(FormRegisterRequesterInfoComponent),
})
export class FormRegisterRequesterInfoComponent extends KspFormBaseComponent {
  @Input() uniType: Array<any> = [];
  @Input() prefixName: Array<any> = [];
  @Input() occupyList: Array<any> = [];
  validatorMessages = validatorMessages;
  educationOccupy: any = {
    permission: '',
    other: '',
    affiliation: ''
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
}
