import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
})
export class FormUserInfoComponent {
  @Input() isWhiteMode = false;
  
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

  constructor(private fb: FormBuilder) {}
}
