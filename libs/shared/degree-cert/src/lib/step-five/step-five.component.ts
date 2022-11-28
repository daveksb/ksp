import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import _ from 'lodash';

@Component({
  selector: 'ksp-degree-cert-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css'],
  providers: providerFactory(DegreeCertStepFiveComponent),
})
export class DegreeCertStepFiveComponent extends KspFormBaseComponent {
  @Input() disableFields: { forward: any[]; verify: any[] } = {
    forward: [],
    verify: [],
  };
  override form = this.fb.group({
    verify: [],
    returnDate: [],
    forward: [],
  });
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
  isDisable(key: 'verify' | 'forward', option: any):boolean {
    return _.includes(_.get(this.disableFields, `${key}`), option);
  }
}
