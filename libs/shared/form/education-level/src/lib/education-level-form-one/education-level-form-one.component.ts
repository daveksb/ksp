import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Country, KspFormBaseComponent } from '@ksp/shared/interface';
import { AddressService } from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-education-level-form-one',
  templateUrl: './education-level-form-one.component.html',
  styleUrls: ['./education-level-form-one.component.scss'],
  providers: providerFactory(EducationLevelFormOneComponent),
})
export class EducationLevelFormOneComponent extends KspFormBaseComponent {
  @Input() isHasCountry = false;
  @Input() isSupervision = false;

  countries$!: Observable<Country[]>;

  override form = this.fb.group({
    educationInstitution: [null, Validators.required],
    graduateDegree: [null, Validators.required],
    branch: [null, Validators.required],
    admissionDate: [null, Validators.required],
    graduateDate: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  getList() {
    this.countries$ = this.addressService.getCountry();
  }
}
