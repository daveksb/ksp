import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
})
export class FormUserInfoComponent {
  form = this.fb.group({
    prefixTh: [],
    nameTh: [],
    lastnameTh: [],
    prefixEng: [],
    nameEng: [],
    lastnameEng: [],
    sex: [],
    birthdate: [],
    email: [],
    contactPhone: [],
    workplacePhone: [],
  });
  @Input() isInputWhite = false;

  constructor(private fb: FormBuilder) {}
}
