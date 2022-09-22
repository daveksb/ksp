import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-license-check',
  templateUrl: './license-check.component.html',
  styleUrls: ['./license-check.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: providerFactory(LicenseCheckComponent),
})
export class LicenseCheckComponent extends KspFormBaseComponent {
  @Input() reasons: string[] = [];
  @Input() choices: any[] = [];
  @Input() headerTitle = 'ผลการตรวจสอบ';
  @Output() selectedItem = 0;

  override form = this.fb.group({
    result: [],
    reason: [],
    detail: [],
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
