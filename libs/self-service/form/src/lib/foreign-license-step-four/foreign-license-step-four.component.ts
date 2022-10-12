import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

function checkAllValidator(): any {
  return (form: FormGroup) => {
    const qualified: boolean = form.get('qualified')?.value;
    const noSection44: boolean = form.get('noSection44')?.value;
    const everythingIsTrue: boolean = form.get('everythingIsTrue')?.value;
    const provideFurthurDocuments: boolean = form.get(
      'provideFurthurDocuments'
    )?.value;

    if (
      !qualified ||
      !noSection44 ||
      !everythingIsTrue ||
      !provideFurthurDocuments
    ) {
      return { checkall: true };
    }

    return null;
  };
}

@Component({
  selector: 'self-service-foreign-license-step-four',
  templateUrl: './foreign-license-step-four.component.html',
  styleUrls: ['./foreign-license-step-four.component.scss'],
  providers: providerFactory(ForeignLicenseStepFourComponent),
})
export class ForeignLicenseStepFourComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input()
  set personalDeclaration(value: any) {
    setTimeout(() => {
      this.form.patchValue(value);
    }, 0);
  }

  override form = this.fb.group({
    qualified: [],
    noSection44: [],
    immoral: [null, Validators.required],
    incompetent: [null, Validators.required],
    prison: [null, Validators.required],
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

  ngOnInit(): void {
    this.form.setValidators(checkAllValidator());
  }
}
