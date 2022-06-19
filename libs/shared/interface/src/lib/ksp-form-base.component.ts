import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormMode } from './form';

@Component({
  template: ``,
  standalone: true,
})
export class KspFormBaseComponent<T> implements ControlValueAccessor {
  @Input() mode: FormMode = 'edit';
  public disabled = false;

  public value: T | null = null;
  public onChange(newVal: T) {}
  public onTouched(_?: any) {}

  public writeValue(obj: T): void {
    this.value = obj;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
