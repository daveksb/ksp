import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createUniCoordinatorForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { uniPermissionList } from 'libs/shared/constant/src/school-request-constant';

@Component({
  selector: 'uni-form-register-coordinator',
  templateUrl: './form-register-coordinator.component.html',
  styleUrls: ['./form-register-coordinator.component.scss'],
  providers: providerFactory(FormRegisterCoordinatorInfoComponent),
})
export class FormRegisterCoordinatorInfoComponent extends KspFormBaseComponent {
  @Input() uniType: Array<any> = [];
  @Input() prefixName: Array<any> = [];
  @Input() occupyList: Array<any> = [];
  override form = createUniCoordinatorForm(this.fb);
  permissionList: Array<any> = uniPermissionList;
  validatorMessages = validatorMessages;

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value:any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  @Input() formHeader = '';

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
