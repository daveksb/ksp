import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { createDefaultUserForm, providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-form-foreign-id',
  templateUrl: './form-foreign-id.component.html',
  styleUrls: ['./form-foreign-id.component.scss'],
  providers: providerFactory(FormForeignIdComponent),
})
export class FormForeignIdComponent extends KspFormBaseComponent {
  override form = createDefaultUserForm(this.fb, Validators);

  @Input() formHeader = 'ข้อมูลครูชาวต่างชาติ';
  @Input() prefixList: any;
  @Input() countries: any;
  @Input() visaTypeList: any;

  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((value: any) => {
          this.onChange(value);
          this.onTouched();
        })
    );
  }
}
