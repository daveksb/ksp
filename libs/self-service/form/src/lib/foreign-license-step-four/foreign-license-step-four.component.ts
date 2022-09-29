import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-foreign-license-step-four',
  templateUrl: './foreign-license-step-four.component.html',
  styleUrls: ['./foreign-license-step-four.component.scss'],
  providers: providerFactory(ForeignLicenseStepFourComponent),
})
export class ForeignLicenseStepFourComponent extends KspFormBaseComponent {
  @Input()
  set personalDeclaration(value: any) {
    setTimeout(() => {
      this.form.patchValue(value);
    }, 0);
  }

  override form = this.fb.group({
    qualified: [],
    noSection44: [],
    immoral: [],
    incompetent: [],
    prison: [],
    everythingIsTrue: [],
    provideFurthurDocuments: [],
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
