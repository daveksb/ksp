import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { providerFactory } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ksp-consider-ksp-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './consider-ksp-request.component.html',
  styleUrls: ['./consider-ksp-request.component.scss'],
  providers: providerFactory(ConsiderKspRequestComponent),
})
export class ConsiderKspRequestComponent extends KspFormBaseComponent {
  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  override form = this.fb.group({
    result: [null, Validators.required],
    approveNo: [],
    approveDate: [],
  });
}
