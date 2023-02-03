import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { getCookie, providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { UniInfoService } from '@ksp/shared/service';
@UntilDestroy()
@Component({
  selector: 'ksp-degree-cert-approved-search',
  templateUrl: './degree-cert-approved-search.component.html',
  styleUrls: ['./degree-cert-approved-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: providerFactory(DegreeCertApprovedSearchComponent),
})
export class DegreeCertApprovedSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    requestno: [],
    requestdate: [],
    fulldegreename: [],
    unicode: [],
    uniid: [],
    degreeapprovecode: [],
    degreelevel: [],
    admissionstatus: [],
    graduatestatus: [],
  });

  @Output() searched = new EventEmitter<boolean>();
  @Output() cleared = new EventEmitter<boolean>();
  @Input() uniUniversityOption: ListData[] = [];
  @Input() degreeLevelOption: ListData[] = [];
  @Input() statusOption: ListData[] = [];

  constructor(
    private fb: FormBuilder,
    ) {
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
