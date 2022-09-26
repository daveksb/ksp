import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-degree-cert-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css'],
  providers: providerFactory(DegreeCertStepFiveComponent),
})
export class DegreeCertStepFiveComponent extends KspFormBaseComponent {
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
}
