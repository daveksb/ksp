import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyInfoService } from '@ksp/shared/service';

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
    birthDate: [''],
    nationality: [''],
    religion: [''],
    postLevel: [''],
    address: [''],
  });

  constructor(private fb: FormBuilder, private myInfoService: MyInfoService) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      ('');
    });

    this.myInfoService.getMyInfo().subscribe((res) => {
      console.log(res);
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
      this.status = 'edit';
      this.label = 'แก้ไขข้อมูล';
      this.form.disable();
    }
  }
}
