import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-four',
  templateUrl: './education-level-form-four.component.html',
  styleUrls: ['./education-level-form-four.component.scss'],
})
export class EducationLevelFormFourComponent implements DynamicComponent {
  form = this.fb.group({
    educationInstitution: [],
    graduateDegree: [],
    branch: [],
    admissionDate: [],
    graduateDate: [],
    approveAcademic: [],
  });
  @Input() data: any;

  constructor(private fb: FormBuilder) {}
}
