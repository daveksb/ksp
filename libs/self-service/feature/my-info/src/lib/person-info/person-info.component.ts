import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'self-service-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent implements OnInit {
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
}
