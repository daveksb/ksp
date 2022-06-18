import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-degree-info',
  templateUrl: './degree-info.component.html',
  styleUrls: ['./degree-info.component.scss'],
})
export class DegreeInfoComponent implements OnInit {
  _degreeTypes: ListData[] = [];

  form = this.fb.group({
    year: [],
    courseName: [],
    degreeType: [],
  });

  @Input()
  set degreeTypes(value: ListData[]) {
    this._degreeTypes = value;
  }

  get degreeTypes(): ListData[] {
    return this._degreeTypes;
  }

  @Output() degreeTypeChanged = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls['degreeType'].valueChanges.subscribe((res) => {
      // it has 8 degree types and target with 2 form types
      const degreeType = Number(res) < 4 ? 'a' : 'b';
      this.degreeTypeChanged.emit(degreeType);
    });
  }
}
