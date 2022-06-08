import { Component, Input } from '@angular/core';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-one',
  templateUrl: './education-level-form-one.component.html',
  styleUrls: ['./education-level-form-one.component.scss'],
})
export class EducationLevelFormOneComponent implements DynamicComponent {
  @Input() data: any;
}
