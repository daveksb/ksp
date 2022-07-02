import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-ethics-accusation-search',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
  providers: providerFactory(AccusationSearchComponent),
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
