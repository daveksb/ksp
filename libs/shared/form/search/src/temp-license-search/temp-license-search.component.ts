import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-temp-license-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './temp-license-search.component.html',
  styleUrls: ['./temp-license-search.component.scss'],
  providers: providerFactory(TempLicenseSearchComponent),
})
export class TempLicenseSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    licenseNumber: [],
    personId: [],
    professionType: [],
    process: [],
    status: [],
    submitDateFrom: [],
    submitDateTo: [],
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

  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<boolean>(false);
}
