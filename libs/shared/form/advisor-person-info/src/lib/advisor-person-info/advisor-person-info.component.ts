import { Component } from '@angular/core';
import {
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
  form: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
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
}
