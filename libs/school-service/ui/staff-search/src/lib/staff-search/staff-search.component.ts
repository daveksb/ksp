import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { levels } from '@ksp/shared/constant';
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
  levels = levels;

  override form = this.fb.group({
    licenseno: [],
    licenseType: [],
    cardno: [],
    name: [],
    position: [],
    teachinglevel: [],
  });

  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<any>();
  @Input() positions: any[] = [];
  @Input() licenseTypes: any[] = [];


  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
