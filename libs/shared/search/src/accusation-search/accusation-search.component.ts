import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
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
  @Output() submited = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private service: EthicsService) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  onClickSearch() {
    const payload = {
      ethicsno: '',
      accusationblackno: '',
      resultredno: '',
      firstname: '',
      lastnameth: '',
      idcardno: '',
      firstnameinfo: '',
      lastnamethinfo: '',
      idcardnoinfo: '',
      licensenoinfo: '',
      offset: '0',
      row: '10',
    };
    this.service
      .searchEthicssearch(payload)
      .subscribe((res) => console.log(res));
  }
}
