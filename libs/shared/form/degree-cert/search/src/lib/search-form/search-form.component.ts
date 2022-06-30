import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-cert-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: providerFactory(SearchFormComponent),
})
export class SearchFormComponent extends KspFormBaseComponent {
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
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
