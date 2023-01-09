import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
  @Output() changeStatus = new EventEmitter<boolean>();
  @Input() uniUniversityOption: ListData[] = [];
  @Input() degreeLevelOption: ListData[] = [];
  @Input() verifyStatusOption: ListData[] = [];
  @Input() approveStatusOption: ListData[] = [];

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

  handleChangeStatus(event: any) {
    const valueChange = event.target.value;
    this.changeStatus.emit(valueChange)
  }
}
