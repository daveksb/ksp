import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-user-info-foreign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-user-info-foreign.component.html',
  styleUrls: ['./form-user-info-foreign.component.scss'],
  providers: providerFactory(FormUserInfoForeignComponent),
})
export class FormUserInfoForeignComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({});

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

  ngOnInit(): void {}
}
