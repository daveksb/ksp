import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-two',
  templateUrl: './education-level-form-two.component.html',
  styleUrls: ['./education-level-form-two.component.scss'],
})
export class EducationLevelFormTwoComponent implements DynamicComponent {
  form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
    beforeDegree: [],
  });

  @Input() data: any;

  constructor(private fb: FormBuilder) {}
}
