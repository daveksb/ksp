import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss'],
})
export class ExperienceFormComponent {
  form = this.fb.group({
    foreignLicense: [],
    country: [],
    licenseType: [],
    licenseNumber: [],
    licenserelease: [],
    licenseExpire: [],
  });

  constructor(private fb: FormBuilder) {}
}
