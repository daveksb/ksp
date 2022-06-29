import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'school-service-staff-search',
  templateUrl: './staff-search.component.html',
  styleUrls: ['./staff-search.component.scss'],
  providers: providerFactory(StaffSearchComponent),
})
export class StaffSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    licenseNumber: [],
    licenseType: [],
    personId: [],
    name: [],
    post: [],
    TeachingLevel: [],
  });

  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();

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
