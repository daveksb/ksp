import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-user-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: providerFactory(UserSearchComponent),
})
export class UserSearchComponent extends KspFormBaseComponent {
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
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
