import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-research',
  templateUrl: './activity-research.component.html',
  styleUrls: ['./activity-research.component.scss'],
  providers: providerFactory(ActivityResearchComponent),
})
export class ActivityResearchComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  //การทำวิจัยในเรื่องที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา
  override form = this.fb.group({
    researchName: [null, Validators.required],
    researchDate: [null, Validators.required],
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
