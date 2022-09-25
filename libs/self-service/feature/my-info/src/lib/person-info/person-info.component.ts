import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelfMyInfo } from '@ksp/shared/interface';
import { MyInfoService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent implements OnInit {
  status = 'edit';
  label = 'แก้ไขข้อมูล';

  form = this.fb.group({
    firstnameth: [''],
    lastnameth: [''],
    firstnameen: [''],
    lastnameen: [''],
    password: [''],
    phone: [''],
    birthdate: [''],
    nationality: [''],
    religion: [''],
    idcardno: [''],
    address: [''],
  });
  baseForm = this.fb.group(new SelfMyInfo());
  constructor(private fb: FormBuilder, private myInfoService: MyInfoService) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      ('');
    });

    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      this.form.patchValue(res);
    });
    this.form.disable();
  }

  clearData() {
    this.form.reset();
  }

  onClick() {
    if (this.status == 'edit') {
      this.status = 'save';
      this.label = 'บันทึกข้อมูล';
      this.form.enable();
    } else {
      this.baseForm.patchValue(this.form.getRawValue());
      const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
      this.myInfoService
        .updateMyInfo(payload)
        .subscribe((res) => console.log(res));
      this.status = 'edit';
      this.label = 'แก้ไขข้อมูล';
      this.form.disable();
    }
  }
}
