import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-three',
  templateUrl: './education-level-form-three.component.html',
  styleUrls: ['./education-level-form-three.component.scss'],
})
export class EducationLevelFormThreeComponent implements DynamicComponent {
  form = this.fb.group({
    resolutionTimes: [],
    resolutionDate: [],
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    country: [],
    admissionDate: [],
    graduateDate: [],
  });
  @Input() data: any;

  constructor(private fb: FormBuilder) {}
}
