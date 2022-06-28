import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-accusation-search',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
  providers: providerFactory(AccusationSearchComponent),
})
export class AccusationSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    listNumber: [],
    eraBe: [],
    fromToDate: [],
    blackNumber: [],
    redNumber: [],

    accusedLicenseNumber: [],
    accusedPersonId: [],
    accusedFirstname: [],
    accusedLastname: [],

    accuserLicenseNumber: [],
    accuserPersonId: [],
    accuserFirstname: [],
    accuserLastname: [],
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

  @Output() submited = new EventEmitter<boolean>();
}
