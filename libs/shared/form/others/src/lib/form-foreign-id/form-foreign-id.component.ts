import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-form-foreign-id',
  templateUrl: './form-foreign-id.component.html',
  styleUrls: ['./form-foreign-id.component.scss'],
  providers: providerFactory(FormForeignIdComponent),
})
export class FormForeignIdComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    prefixEn: [],
    nameEn: [],
    midnameEn: [],
    lastnameEn: [],
    prefixTh: [],
    nameTh: [],
    midnameTh: [],
    lastnameTh: [],
    sex: [],
    birthDate: [],
    email: [],
    contactPhone: [],
    passportNumber: [],
    country: [],
    passportRelease: [],
    passportExpire: [],
    visaClass: [],
    visaType: [],
    visaExpire: [],
  });

  @Input() formHeader = 'ข้อมูลครูชาวต่างชาติ';

  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];

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
}
