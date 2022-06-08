import { Component, Input } from '@angular/core';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-three',
  templateUrl: './education-level-form-three.component.html',
  styleUrls: ['./education-level-form-three.component.scss'],
})
export class EducationLevelFormThreeComponent implements DynamicComponent {
  @Input() data: any;
}
