import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-revoke-info-form',
  templateUrl: './revoke-info-form.component.html',
  styleUrls: ['./revoke-info-form.component.scss'],
  providers: providerFactory(RevokeInfoFormComponent),
})
export class RevokeInfoFormComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    isRevoke: [null],
    matiNo: [null],
    date: [null],
    revokeDate: [null],
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

  ngOnInit(): void {}
}
