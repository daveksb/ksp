import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-diploma-receive',
  templateUrl: './activity-diploma-receive.component.html',
  styleUrls: ['./activity-diploma-receive.component.scss'],
  providers: providerFactory(ActivityDiplomaReceiveComponent),
})
export class ActivityDiplomaReceiveComponent extends KspFormBaseComponent {
  @Input() data: any;
  @Input() isForeignForm = false;

  override form = this.fb.group({
    course: [],
    trainingDate: [],
    trainingAddress: [],
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
