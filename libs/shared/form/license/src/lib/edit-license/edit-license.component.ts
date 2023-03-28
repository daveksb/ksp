import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KspFormBaseComponent, Prefix } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

function checkboxValidator(): any {
  return (form: FormGroup) => {
    const changePrefix: boolean = form.get('changePrefix')?.value;
    const changeLastname: boolean = form.get('changeLastname')?.value;
    const isDistributed: boolean = form.get('isDistributed')?.value;
    const changeFirstname: boolean = form.get('changeFirstname')?.value;
    if (
      !changePrefix &&
      !changeFirstname &&
      !changeLastname &&
      !isDistributed
    ) {
      return { checkbox: true };
    }
    return null;
  };
}

@UntilDestroy()
@Component({
  selector: 'ksp-edit-license',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.scss'],
  providers: providerFactory(EditLicenseComponent),
})
export class EditLicenseComponent
  extends KspFormBaseComponent
  implements OnInit
{
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
  @Input() disableEdit = false;
  @Input() showDistributeData = false;
  @Input() prefixList: Prefix[] | null = [];
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
      this.form?.valueChanges.subscribe(() => {
        const changeValue = this.form.getRawValue();
        this.onChange(changeValue);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.setValidators(checkboxValidator());
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.changePrefix !== next.changePrefix) {
          if (next.changePrefix) {
            this.form.controls.prefixTh.addValidators(Validators.required);
            this.form.controls.prefixEn.addValidators(Validators.required);
          } else {
            this.form.controls.prefixTh.clearValidators();
            this.form.controls.prefixEn.clearValidators();
          }
          this.form.controls.prefixTh.updateValueAndValidity();
          this.form.controls.prefixEn.updateValueAndValidity();
        }

        if (prev.changeFirstname !== next.changeFirstname) {
          if (next.changeFirstname) {
            this.form.controls.firstnameTh.addValidators(Validators.required);
            this.form.controls.firstnameEn.addValidators(Validators.required);
          } else {
            this.form.controls.firstnameTh.clearValidators();
            this.form.controls.firstnameEn.clearValidators();
          }
          this.form.controls.firstnameTh.updateValueAndValidity();
          this.form.controls.firstnameEn.updateValueAndValidity();
        }

        if (prev.changeLastname !== next.changeLastname) {
          if (next.changeLastname) {
            this.form.controls.lastnameTh.addValidators(Validators.required);
            this.form.controls.lastnameEn.addValidators(Validators.required);
          } else {
            this.form.controls.lastnameTh.clearValidators();
            this.form.controls.lastnameEn.clearValidators();
          }
          this.form.controls.lastnameTh.updateValueAndValidity();
          this.form.controls.lastnameEn.updateValueAndValidity();
        }

        if (prev.changePassport !== next.changePassport) {
          if (next.changePassport) {
            this.form.controls.passportNo.addValidators(Validators.required);
          } else {
            this.form.controls.passportNo.clearValidators();
          }
          this.form.controls.passportNo.updateValueAndValidity();
        }

        if (prev.isDistributed !== next.isDistributed) {
          if (next.isDistributed) {
            this.form.controls.distributeData.addValidators(
              Validators.required
            );
          } else {
            this.form.controls.distributeData.clearValidators();
          }
          this.form.controls.distributeData.updateValueAndValidity();
        }
      });
  }

  override set value(value: any) {
    this.form.patchValue(value);
    if (this.mode !== 'view') {
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
    }

    this.onChange(value);
    this.onTouched();
  }

  disableControl(evt: any, controlList: controlName[]) {
    const checked = evt.target.checked;
    controlList.forEach((i) => {
      if (checked) {
        this.form.controls[i].enable();
        this.form.controls[i].setValidators([Validators.required]);
      } else {
        this.form.controls[i].disable();
        this.form.controls[i].clearValidators();
      }
      this.form.controls[i].updateValueAndValidity();
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
