import { Component, Input } from '@angular/core';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-education-level-form-four',
  templateUrl: './education-level-form-four.component.html',
  styleUrls: ['./education-level-form-four.component.scss'],
})
export class EducationLevelFormFourComponent implements DynamicComponent {
  @Input() data: any;
}
