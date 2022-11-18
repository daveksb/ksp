import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Country, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

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
  @Input() countries: Country[] | null = [];
  @Input() licenses: any[] = [];
  override form = this.fb.group({
    TrainingAddressOne: [null, Validators.required],
    TrainingAddressTwo: [null, Validators.required],
    teachingAddressForm: this.fb.array([
      this.fb.group({
        teachingAddress: [null, Validators.required],
      }),
    ]),
    /* teachingAddress: [null, Validators.required], */
    hasForeignLicense: [],
    foreignLicenseForm: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        // console.log('prev', prev);
        // console.log('next', next);
        //console.log('exp form = ', res);
        if (prev.hasForeignLicense !== next.hasForeignLicense) {
          if (next.hasForeignLicense) {
            console.log('set validators');
            this.form.controls.foreignLicenseForm.addValidators(
              Validators.required
            );
          } else {
            this.form.controls.foreignLicenseForm.clearValidators();
          }
          this.form.controls.foreignLicenseForm.updateValueAndValidity();
        }
      });
  }

  deleteAddress(index: number) {
    this.address.removeAt(index);
  }

  addAddress() {
    const form = this.fb.group({
      teachingAddress: [null, Validators.required],
    });
    this.address.push(form);
  }

  resetForeignLicenseForm(evt: any) {
    const checked = evt.target.checked;
    if (!checked) this.form.controls.foreignLicenseForm.reset();
  }

  get address() {
    return this.form.controls.teachingAddressForm;
  }

  get hasForeignLicense() {
    return this.form.controls.hasForeignLicense.value;
  }
}
