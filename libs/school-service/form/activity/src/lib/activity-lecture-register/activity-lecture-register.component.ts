import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-lecture-register',
  templateUrl: './activity-lecture-register.component.html',
  styleUrls: ['./activity-lecture-register.component.scss'],
  providers: providerFactory(ActivityLectureRegisterComponent),
})
export class ActivityLectureRegisterComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  //การเป็นวิทยากร ผู้บรรยาย ผู้อภิปราย หรือผู้อภิปรายร่วมในกิจกรรมที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน
  override form = this.fb.group({
    name: [null, Validators.required],
    address: [null, Validators.required],
    agency: [null, Validators.required],
    dateFrom: [null, Validators.required],
    dateTo: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
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
