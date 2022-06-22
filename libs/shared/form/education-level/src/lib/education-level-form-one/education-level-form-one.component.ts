import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-one',
  templateUrl: './education-level-form-one.component.html',
  styleUrls: ['./education-level-form-one.component.scss'],
})
export class EducationLevelFormOneComponent implements DynamicComponent {
  form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
  });

  @Input() data: any;

  constructor(private fb: FormBuilder) {}
}
