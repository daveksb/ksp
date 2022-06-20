/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormMode } from './form';

@Component({
  template: ``,
  standalone: true,
})
export abstract class KspFormBaseComponent implements ControlValueAccessor {
  _mode: FormMode = 'edit';

  @Input()
  set mode(value: FormMode) {
    this._mode = value;
    if (value === 'view') {
      this.form.disable();
    }
  }

  get mode(): FormMode {
    return this._mode;
  }

  public form!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  get value() {
    return this.form.value;
  }

  set value(value: any) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

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
    if (this.form.valid) {
      return null;
    }
    const errors: any = {};
    return errors;
  }

  /* ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  } */
}
