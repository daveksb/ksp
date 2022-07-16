import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './degree-search.component.html',
  styleUrls: ['./degree-search.component.scss'],
  providers: providerFactory(DegreeSearchComponent),
})
export class DegreeSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    institution: [''],
    affiliation: [''],
    degreeCode: [],
    degreeName: [],
    degreeLevel: [''],
    openYear: [],
    requestNumber: [],
    requestsubmitDate: [],
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
