/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormMode } from './form-mode';

@Component({
  template: ``,
  standalone: true,
})
export abstract class KspFormBaseComponent
  implements ControlValueAccessor, OnChanges
{
  _mode: FormMode = 'edit';

  @Input()
  set mode(value: FormMode) {
    this._mode = value;
    if (value === 'view') {
      setTimeout(() => {
        this.form.disable();
        this.form.controls['idcardno'].enable();
        this.form.controls['isforeign'].enable();
      }, 0);
    } else {
      setTimeout(() => {
        this.form.enable();
      }, 0);
    }
  }

  get mode(): FormMode {
    return this._mode;
  }

  public form!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor() {
    /*  this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    ); */
  }
  get value() {
    return this.form.value;
  }

  set value(value: any) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }
  /*   set value(value: any) {
    for (const key in this.form.controls) {
      if (this.form.controls[key] instanceof FormControl) {
        // normal formControl
        this.form.controls[key].patchValue(value[key]);
      }  else if (this.form.controls[key] instanceof FormArray) {
        // loop into fromArray to patch value
        const formArray = this.form.controls[key] as FormArray;
        for (let i = 0; i < formArray.controls.length; i++) {
          const formGroup = formArray.controls[i] as FormGroup;
          for (const subkey in formGroup.controls) {
            if (value[key] && value[key][i] && value[key][i][subkey]) {
              formGroup.controls[subkey].patchValue(value[key][i][subkey]);
            }
          }
          if (this.mode == 'view') formGroup.disable();
        }
      }  else if (this.form.controls[key] instanceof FormGroup) {
        const formGroup = this.form.controls[key] as FormGroup;
        for (const subkey in formGroup.controls) {
          if (value[key] && value[key] && value[key][subkey]) {
            formGroup.controls[subkey].patchValue(value[key][subkey]);
          }
        }
      }
    }
    // this.onChange(value);
    // this.onTouched();
  } */

  public onChange = (value?: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: () => void) {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  validate() {
    return this.form.valid ? null : { firstname: { valid: false } };
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnChanges(event: any) {
    if (event?.mode) {
      this.mode = event.mode.currentValue;
    }
  }
}
