import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { uniPermissionList } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createUniCoordinatorForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

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
  @Input() formHeader = '';
  @Input() isSubmit = false;
  override form = createUniCoordinatorForm(this.fb);
  permissionList: Array<any> = uniPermissionList;
  validatorMessages = validatorMessages;
  validprefix = true;

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

  chageposition(event: any) {
    if (event.target.value == '0') {
      this.form.controls['other'].setValidators([Validators.required]);
    } else {
      this.form.controls['other'].clearValidators();
      this.form.patchValue({
        other: null
      })
    }
    this.form.controls['other'].updateValueAndValidity();
  }

  changePrefixTH(event: any) {
    this.form.patchValue({
      prefixen: event
    });
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

  get other() {
    return this.form.controls.other;
  }
}
