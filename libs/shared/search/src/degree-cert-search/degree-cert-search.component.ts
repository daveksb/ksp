import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-cert-search',
  templateUrl: './degree-cert-search.component.html',
  styleUrls: ['./degree-cert-search.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: providerFactory(DegreeCertSearchComponent),
})
export class DegreeCertSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    licenseNumber: [],
    date: [],
    degreeName: [],
    institutionNumber: [],
    institutionName: [],
    submitDegreeLevel: [],
    courseStatus: [],
    verifyStatus: [],
    approveStatus: [],
  });

  @Output() searched = new EventEmitter<boolean>();
  @Output() cleared = new EventEmitter<boolean>();

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
