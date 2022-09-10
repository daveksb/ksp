import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-profession-experience',
  templateUrl: './profession-experience.component.html',
  styleUrls: ['./profession-experience.component.scss'],
  providers: providerFactory(ProfessionExperienceComponent),
})
export class ProfessionExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  info = [
    'สำเนาใบรายงานผลการศึกษา (transcript)',
    'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
    'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง',
    'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
    'สำเนาตารางสอนรายสัปดาห์  ',
    'สำเนาคำสั่งแต่งตั้งปฏิบัติหน้าที่',
    'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
  ];
  override form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
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

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
  }

  setDefaulFormValue() {
    this.addFormArray(this.licenseInfo1);
    this.addFormArray(this.licenseInfo2);
    this.addFormArray(this.licenseInfo3);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({ title: [''] });
    form.push(data);
  }

  get licenseInfo1() {
    return this.form.controls['licenseInfo1'] as FormArray;
  }

  get licenseInfo2() {
    return this.form.controls['licenseInfo2'] as FormArray;
  }

  get licenseInfo3() {
    return this.form.controls['licenseInfo3'] as FormArray;
  }
}
