import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'self-service-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent implements OnInit {
  status = 'edit';
  label = 'แก้ไขข้อมูล';

  form = this.fb.group({
    name: [],
    lastname: [],
    password: [],
    phone: [],
    birthDate: [],
    nationality: [],
    religion: [],
    postLevel: [],
    address: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      ('');
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
