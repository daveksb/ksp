import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-two',
  templateUrl: './education-level-form-two.component.html',
  styleUrls: ['./education-level-form-two.component.scss'],
})
export class EducationLevelFormTwoComponent implements DynamicComponent {
  @Input() data: any;
}
