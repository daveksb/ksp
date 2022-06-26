import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-research',
  templateUrl: './activity-research.component.html',
  styleUrls: ['./activity-research.component.scss'],
  providers: providerFactory(ActivityResearchComponent),
})
export class ActivityResearchComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    researchName: [],
    researchDate: [],
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
