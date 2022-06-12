import { Component, Input } from '@angular/core';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-degree-info',
  templateUrl: './degree-info.component.html',
  styleUrls: ['./degree-info.component.scss'],
})
export class DegreeInfoComponent {
  _degreeTypes: ListData[] = [];

  @Input()
  set degreeTypes(value: ListData[]) {
    this._degreeTypes = value;
  }

  get degreeTypes(): ListData[] {
    return this._degreeTypes;
  }
}
