import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'self-service-foreign-step-two-tab-three-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foreign-step-two-tab-three-form.component.html',
  styleUrls: ['./foreign-step-two-tab-three-form.component.scss'],
  providers: providerFactory(ForeignStepTwoTabThreeFormComponent),
})
export class ForeignStepTwoTabThreeFormComponent extends KspFormBaseComponent {
  @Input() countries: any[] = [];

  override form = this.fb.group({
    degreeName: [null, Validators.required],
    major: [null, Validators.required],
    institution: [null, Validators.required],
    admissionDate: [null, Validators.required],
    graduateDate: [null, Validators.required],
    country: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
