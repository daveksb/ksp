import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-innovation',
  templateUrl: './activity-innovation.component.html',
  styleUrls: ['./activity-innovation.component.scss'],
  providers: providerFactory(ActivityInnovationComponent),
})
export class ActivityInnovationComponent extends KspFormBaseComponent {
  @Input() data: any;

  override form = this.fb.group({
    name: [],
    addressUse: [],
    useDate: [],
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
