import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-form-user-training-workplace',
  templateUrl: './form-user-training-workplace.component.html',
  styleUrls: ['./form-user-training-workplace.component.css'],
  providers: providerFactory(FormUserTrainingWorkplaceComponent),
})
export class FormUserTrainingWorkplaceComponent extends KspFormBaseComponent {
  @Input() trainingTimes: any;

  override form = this.fb.group({
    TrainingAddressOne: [],
    TrainingAddressTwo: [],
  });

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
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
