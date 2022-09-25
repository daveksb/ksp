import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-learning-material',
  templateUrl: './activity-learning-material.component.html',
  styleUrls: ['./activity-learning-material.component.scss'],
  providers: providerFactory(ActivityLearningMaterialComponent),
})
export class ActivityLearningMaterialComponent extends KspFormBaseComponent {
  @Input() data: any;

  //`การสร้างสื่อการศึกษา พร้อมแบบทดสอบเพื่อการศึกษาหรือเรียนรู้ด้วยตนเอง ทั้งในรูปแบบเอกสาร และสื่ออิเล็กทรอนิกส์ เช่ย บทความ online , e-learning , E-book เป็นต้น`,

  override form = this.fb.group({
    name: [],
    date: [],
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
}
