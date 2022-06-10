import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'ksp-advisor-person-info',
  templateUrl: './advisor-person-info.component.html',
  styleUrls: ['./advisor-person-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdvisorPersonInfoComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AdvisorPersonInfoComponent,
    },
  ],
})
export class AdvisorPersonInfoComponent {
  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    degrees: this.fb.array([
      {
        name: [''],
        year: [''],
      },
    ]),
  });

  onChangeSubs: Subscription[] = [];

  onTouched: any = () => {};

  constructor(private fb: FormBuilder) {}

  get degrees() {
    return this.form.controls['degrees'];
  }

  addDegree() {
    const degreeform: any = this.fb.group({
      name: [''],
      year: [''],
    });
    this.degrees.push(degreeform);
  }

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
    /*
    errors = this.addControlErrors(errors, 'addressLine1');
    errors = this.addControlErrors(errors, 'city'); */
    return errors;
  }
}
