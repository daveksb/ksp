import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-reward',
  templateUrl: './activity-reward.component.html',
  styleUrls: ['./activity-reward.component.scss'],
  providers: providerFactory(ActivityRewardComponent),
})
export class ActivityRewardComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    name: [],
    agency: [],
    date: [],

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
