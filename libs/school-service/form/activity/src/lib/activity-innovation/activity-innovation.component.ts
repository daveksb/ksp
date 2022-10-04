import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-innovation',
  templateUrl: './activity-innovation.component.html',
  styleUrls: ['./activity-innovation.component.scss'],
  providers: providerFactory(ActivityInnovationComponent),
})
export class ActivityInnovationComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  override form = this.fb.group({
    name: [null, Validators.required],
    addressUse: [null, Validators.required],
    useDate: [null, Validators.required],
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
