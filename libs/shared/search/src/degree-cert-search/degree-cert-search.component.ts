import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
@UntilDestroy()
@Component({
  selector: 'ksp-degree-cert-search',
  templateUrl: './degree-cert-search.component.html',
  styleUrls: ['./degree-cert-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
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
  @Input() uniUniversityOption: ListData[] = [];
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
