import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
  providers: providerFactory(FormUserInfoComponent),
})
export class FormUserInfoComponent extends KspFormBaseComponent {
  @Input() isDarkMode = false;
  @Input() showPostInput = false;
  @Input() showNationalityInput = false;
  @Input() prefixList = null;

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   *
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = this.fb.group({
    idCardNo: ['', Validators.required],
    passportNo: [],
    prefixTh: [null, Validators.required],
    firstNameTh: [null, Validators.required],
    lastNameTh: [null, Validators.required],
    prefixEn: [null, Validators.required],
    firstNameEn: [null, Validators.required],
    lastNameEn: [null, Validators.required],
    sex: [null, Validators.required],
    birthDate: [null, Validators.required],
    email: [null, Validators.required],
    contactPhone: [null, [Validators.required]], //contactPhone: [null, [Validators.required, Validators.pattern(phonePattern)]],
    workPhone: [],
    nationality: [null],
    schoolId: [null],
    createDate: [null],
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
