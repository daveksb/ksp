import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
  override form = this.fb.group({
    prefixTh: [],
    nameTh: [],
    lastnameTh: [],
    prefixEn: [],
    nameEn: [],
    lastnameEn: [],
    post: [],
    workplacePhone: [],
    contactPhone: [],
    email: [],
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
}
