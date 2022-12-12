import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-reward-reject-form',
  templateUrl: './reward-reject-form.component.html',
  styleUrls: ['./reward-reject-form.component.scss'],
  providers: providerFactory(RewardRejectFormComponent),
})
export class RewardRejectFormComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    rewardInfo: [null],
    rejectInfo: [null],
    revokeInfo: [null],
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
