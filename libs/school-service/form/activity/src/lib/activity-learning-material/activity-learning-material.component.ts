import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-learning-material',
  templateUrl: './activity-learning-material.component.html',
  styleUrls: ['./activity-learning-material.component.scss'],
  providers: providerFactory(ActivityLearningMaterialComponent),
})
export class ActivityLearningMaterialComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  //`การสร้างสื่อการศึกษา พร้อมแบบทดสอบเพื่อการศึกษาหรือเรียนรู้ด้วยตนเอง ทั้งในรูปแบบเอกสาร และสื่ออิเล็กทรอนิกส์ เช่ย บทความ online , e-learning , E-book เป็นต้น`,

  override form = this.fb.group({
    name: [null, Validators.required],
    date: [null, Validators.required],
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
