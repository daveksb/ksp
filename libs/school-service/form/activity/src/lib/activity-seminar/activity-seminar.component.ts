import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-seminar',
  templateUrl: './activity-seminar.component.html',
  styleUrls: ['./activity-seminar.component.scss'],
  providers: providerFactory(ActivitySeminarComponent),
})
export class ActivitySeminarComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    course: [],
    trainingAddress: [],
    trainingAgency: [],
    dateFrom: [],
    dateTo: [],
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
