import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'self-service-form-user-experience',
  templateUrl: './form-user-experience.component.html',
  styleUrls: ['./form-user-experience.component.css'],
  providers: providerFactory(FormUserExperienceComponent),
})
export class FormUserExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    TrainingAddressOne: [],
    TrainingAddressTwo: [],
    teachingAddress: [],
    hasForeignLicense: [],
    foreignLicenseForm: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this))
      .subscribe((res) => {
        //console.log('exp form = ', res);
      });
  }

  resetForeignLicenseForm(evt: any) {
    const checked = evt.target.checked;
    if (!checked) this.form.controls.foreignLicenseForm.reset();
  }

  get hasForeignLicense() {
    return this.form.controls.hasForeignLicense.value;
  }
}
