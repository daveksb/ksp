import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '../shared-form-others.module';
import { providerFactory } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-form-teaching-info-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-teaching-info-manager.component.html',
  styleUrls: ['./form-teaching-info-manager.component.scss'],
  providers: providerFactory(FormTeachingInfoManagerComponent),
})
export class FormTeachingInfoManagerComponent
  extends KspFormBaseComponent
  implements OnInit
{
  items = items;

  override form = this.fb.group({});

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

  ngOnInit(): void {}
}

export const items = [
  {
    label: 'กรณี มีประสบการณ์ด้านปฏิบัติการสอนมาแล้วไม่น้อยกว่า 5 ปี',
    name: 'lv1',
    value: false,
  },
  {
    label: `กรณี มีประสบการณ์ด้านการสอนด้านการสอนและมีประสบการณ์ในตำแหน่งหัวหน้าหมวดหรือหัวหน้าสาย หัวหน้างาน หรือตำแหน่งบริหารอื่น ในสถานศึกษาไม่น้อยกว่า 2 ปี`,
    name: 'lv2',
    value: false,
  },
];
