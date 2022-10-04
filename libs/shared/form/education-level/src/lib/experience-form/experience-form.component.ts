import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss'],
  providers: providerFactory(ExperienceFormComponent),
})
export class ExperienceFormComponent
  extends KspFormBaseComponent
  implements OnInit, OnDestroy
{
  @Input() countries: any[] = [];
  @Input() licenses: any[] = [];

  override form = this.fb.group({
    foreignLicense: [null, Validators.required],
    country: [null, Validators.required],
    licenseType: [null, Validators.required],
    licenseNumber: [null, Validators.required],
    licenserelease: [null, Validators.required],
    licenseExpire: [null, Validators.required],
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

  ngOnInit() {
    // console.log(this.form.valid);
  }

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }
}
