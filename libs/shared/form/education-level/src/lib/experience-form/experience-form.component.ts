import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss'],
  providers: providerFactory(ExperienceFormComponent),
})
export class ExperienceFormComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    foreignLicense: [],
    country: [],
    licenseType: [],
    licenseNumber: [],
    licenserelease: [],
    licenseExpire: [],
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
