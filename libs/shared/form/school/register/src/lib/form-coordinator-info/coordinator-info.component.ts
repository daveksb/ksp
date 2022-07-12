import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  phonePattern,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'ksp-form-coordinator-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.scss'],
  providers: providerFactory(FormCoordinatorInfoComponent),
})
export class FormCoordinatorInfoComponent extends KspFormBaseComponent {
  validatorMessages = validatorMessages;

  override form = this.fb.group({
    prefixTh: [],
    nameTh: [],
    lastnameTh: [],
    prefixEn: [],
    nameEn: [],
    lastnameEn: [],
    post: [],
    workplacePhone: [],
    contactPhone: [null, [Validators.pattern(phonePattern)]],
    email: ['', [Validators.email]],
  });

  @Input() isGrayMode = true;

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

  get email() {
    return this.form.controls.email;
  }

  get contactPhone() {
    return this.form.controls.contactPhone;
  }
}
