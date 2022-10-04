import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-study-tour',
  templateUrl: './activity-study-tour.component.html',
  styleUrls: ['./activity-study-tour.component.scss'],
  providers: providerFactory(ActivityStudyTourComponent),
})
export class ActivityStudyTourComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  //การศึกษาดูงานที่เกี่ยวข้องกับวิชาชีพทางการศึกษา ทั้งในประเทศ หรือต่างประเทศ
  override form = this.fb.group({
    name: [null, Validators.required],
    address: [null, Validators.required],
    agency: [null, Validators.required],
    date: [null, Validators.required],
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
