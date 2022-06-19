import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ksp-advisor-info',
  templateUrl: './advisor-info.component.html',
  styleUrls: ['./advisor-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdvisorInfoComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AdvisorInfoComponent,
    },
  ],
})
export class AdvisorInfoComponent {
  form = this.fb.group({
    advisorStatus: [''],
    advisorType: [''],
    studentNumber: [],
  });

  onChangeSubs: Subscription[] = [];

  onTouched: any = () => {};

  constructor(private fb: FormBuilder) {}

  registerOnChange(onChange: any) {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }
    const errors: any = {};
    //errors = this.addControlErrors(errors, 'city');
    return errors;
  }
}
