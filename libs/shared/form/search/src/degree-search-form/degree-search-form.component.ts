import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-degree-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './degree-search-form.component.html',
  styleUrls: ['./degree-search-form.component.scss'],
  providers: providerFactory(DegreeSearchFormComponent),
})
export class DegreeSearchFormComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    institution: [],
    affiliation: [],
    degreeCode: [],
    degreeName: [],
    degreeLvel: [],
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
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
