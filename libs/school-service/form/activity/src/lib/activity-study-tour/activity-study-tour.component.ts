import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-study-tour',
  templateUrl: './activity-study-tour.component.html',
  styleUrls: ['./activity-study-tour.component.scss'],
  providers: providerFactory(ActivityStudyTourComponent),
})
export class ActivityStudyTourComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    name: [],
    address: [],
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
