import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-user-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './institute-search.component.html',
  styleUrls: ['./institute-search.component.scss'],
  providers: providerFactory(InstituteSearchComponent),
})
export class InstituteSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    licenseNumber: [],
    personId: [],
    professionType: [],
    process: [],
    status: [],
    submitDateFrom: [],
    submitDateTo: [],
  });

  @Output() search = new EventEmitter<boolean>();
  @Output() clear = new EventEmitter<boolean>();
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
