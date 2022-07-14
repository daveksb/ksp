import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCoordinatorInfoComponent } from '../form-coordinator-info/coordinator-info.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-form-requester-info',
  standalone: true,
  imports: [CommonModule, FormCoordinatorInfoComponent, ReactiveFormsModule],
  templateUrl: './requester-info.component.html',
  styleUrls: ['./requester-info.component.scss'],
  providers: providerFactory(FormRequesterInfoComponent),
})
export class FormRequesterInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    personId: [
      '',
      [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(13),
        Validators.maxLength(13),
      ],
    ],
    requesterInfo: [],
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

  get personId() {
    return this.form.controls.personId;
  }
}
