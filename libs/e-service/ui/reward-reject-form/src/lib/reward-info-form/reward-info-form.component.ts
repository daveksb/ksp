import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-reward-info-form',
  templateUrl: './reward-info-form.component.html',
  styleUrls: ['./reward-info-form.component.scss'],
  providers: providerFactory(RewardInfoFormComponent),
})
export class RewardInfoFormComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    id: [null],
    prefix: [null],
    name: [null],
    surname: [null],
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
