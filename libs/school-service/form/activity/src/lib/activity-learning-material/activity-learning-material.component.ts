import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-learning-material',
  templateUrl: './activity-learning-material.component.html',
  styleUrls: ['./activity-learning-material.component.scss'],
  providers: providerFactory(ActivityLearningMaterialComponent),
})
export class ActivityLearningMaterialComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    name: [],
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
