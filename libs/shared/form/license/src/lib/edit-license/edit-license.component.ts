import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-edit-license',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.scss'],
  providers: providerFactory(EditLicenseComponent),
})
export class EditLicenseComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    changePrefix: [],
    oldPrefixTh: [{ value: null, disabled: true }],
    oldPrefixEn: [{ value: null, disabled: true }],
    prefixTh: [{ value: null, disabled: true }],
    prefixEn: [{ value: null, disabled: true }],
    changeFirstname: [],
    oldFirstnameTh: [{ value: null, disabled: true }],
    oldFirstnameEn: [{ value: null, disabled: true }],
    firstnameTh: [{ value: null, disabled: true }],
    firstnameEn: [{ value: null, disabled: true }],
    changeLastname: [],
    oldLastnameTh: [{ value: null, disabled: true }],
    oldLastnameEn: [{ value: null, disabled: true }],
    lastnameTh: [{ value: null, disabled: true }],
    lastnameEn: [{ value: null, disabled: true }],
    changePassport: [],
    oldPassportNo: [{ value: null, disabled: true }],
    passportNo: [{ value: null, disabled: true }],
    isDistributed: [],
    distributeData: [{ value: null, disabled: true }],
  });

  @Input() showEditPassport = false;
  @Input() showDistributeData = false;
  @Input() prefixList: any[] = [];
  @Input()
  set oldValue(value: any) {
    setTimeout(() => {
      if (value) {
        this.form.patchValue({
          oldPrefixTh: value.prefixth,
          oldPrefixEn: value.prefixen,
          oldFirstnameTh: value.firstnameth,
          oldFirstnameEn: value.firstnameen,
          oldLastnameTh: value.lastnameth,
          oldLastnameEn: value.lastnameen,
          oldPassportNo: value.passportno,
        });
      }
    }, 0);
  }

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

  override set value(value: any) {
    this.form.patchValue(value);
    if (value.changePrefix) {
      this.form.controls.prefixTh.enable();
      this.form.controls.prefixEn.enable();
    }

    if (value.changeFirstname) {
      this.form.controls.firstnameEn.enable();
      this.form.controls.firstnameTh.enable();
    }

    if (value.changeLastname) {
      this.form.controls.lastnameEn.enable();
      this.form.controls.lastnameTh.enable();
    }

    if (value.changePassport) {
      this.form.controls.passportNo.enable();
    }

    if (value.isDistributed) {
      this.form.controls.distributeData.enable();
    }

    this.onChange(value);
    this.onTouched();
  }

  disableControl(evt: any, controlList: controlName[]) {
    const checked = evt.target.checked;
    controlList.forEach((i) => {
      if (checked) {
        this.form.controls[i].enable();
      } else {
        this.form.controls[i].disable();
      }
    });
  }
}

export type controlName =
  | 'prefixTh'
  | 'prefixEn'
  | 'firstnameTh'
  | 'firstnameEn'
  | 'lastnameTh'
  | 'lastnameEn'
  | 'passportNo'
  | 'distributeData';
