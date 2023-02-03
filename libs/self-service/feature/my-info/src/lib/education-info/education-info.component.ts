import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormMode, SelfMyInfo } from '@ksp/shared/interface';
import { AddressService, MyInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { TransferKnowledgeEducationComponent } from '@ksp/self-service/form';
@Component({
  selector: 'self-service-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss'],
})
export class EducationInfoComponent implements OnInit {
  label = 'แก้ไขข้อมูล';
  mode: FormMode = 'view';
  countries$!: Observable<any>;
  baseForm = this.fb.group(new SelfMyInfo());

  form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
    licenseInfo4: this.fb.array([]),
    licenseInfo5: this.fb.array([]),
  });

  mapping: { [key: number]: any } = {
    0: this.licenseInfo1,
    1: this.licenseInfo2,
    2: this.licenseInfo3,
    3: this.licenseInfo4,
    4: this.licenseInfo5,
  };

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.countries$ = this.addressService.getCountry();
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      const eduinfo = JSON.parse(res.eduinfo as string);
      let index = 0;
      for (const key in eduinfo) {
        for (let i = 0; i < eduinfo[key].length; i++) {
          this.addFormArray(index);
        }
        index++;
      }
      this.form.patchValue(eduinfo);
    });
  }

  addFormArray(formNumber: number) {
    const form = this.mapping[formNumber];

    const data = this.fb.group({
      licenseForm: [null, Validators.required],
    });

    form.push(data);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  clear() {
    this.form.reset();
  }

  onClickSave() {
    if (this.mode === 'view') {
      this.mode = 'edit';
      this.label = 'บันทึกข้อมูล';
    } else {
      this.mode = 'view';
      this.label = 'แก้ไขข้อมูล';
      const formData = this.form.value;
      this.baseForm.patchValue({ eduinfo: JSON.stringify({ ...formData }) });
      const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
      console.log(payload);
      this.myInfoService
        .updateMyInfo(payload)
        .subscribe((res) => console.log(res));
    }
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

  get licenseInfo4() {
    return this.form.controls['licenseInfo4'] as FormArray;
  }

  get licenseInfo5() {
    return this.form.controls['licenseInfo5'] as FormArray;
  }
}
