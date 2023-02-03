import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-reject-info-form',
  templateUrl: './reject-info-form.component.html',
  styleUrls: ['./reject-info-form.component.scss'],
  providers: providerFactory(RejectInfoFormComponent),
})
export class RejectInfoFormComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    isReject: [null],
    id: [null],
    prefix: [null],
    name: [null],
    surname: [null],
    rejectReason: [null],
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
