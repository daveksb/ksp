import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-lecturer',
  templateUrl: './activity-lecturer.component.html',
  styleUrls: ['./activity-lecturer.component.scss'],
  providers: providerFactory(ActivityLecturerComponent),
})
export class ActivityLecturerComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;
  @Input() showDateTo = false;

  override form = this.fb.group({
    subject: [null, Validators.required],
    address: [null, Validators.required],
    agency: [null, Validators.required],
    hour: [null, Validators.required],
    date: [null, Validators.required],
    dateTo: [null, Validators.required],
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

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }
}
