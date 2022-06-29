import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-final-result-info',
  templateUrl: './final-result-info.component.html',
  styleUrls: ['./final-result-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  providers: providerFactory(FinalResultInfoComponent),
})
export class FinalResultInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    reasonTimes: [],
    date: [],
    approvedegreeCode: [],
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
}
