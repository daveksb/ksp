import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-info',
  templateUrl: './degree-info.component.html',
  styleUrls: ['./degree-info.component.scss'],
  providers: providerFactory(DegreeInfoComponent),
})
export class DegreeInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  _degreeTypes: ListData[] = [];

  override form = this.fb.group({
    degreeType: [],
    courseYear: [],
    courseName: [],
    degreeNameThFull: [],
    degreeNameEnFull: [],
    degreeNameThShort: [],
    degreeNameEnShort: [],
  });

  @Input()
  set degreeTypes(value: ListData[]) {
    this._degreeTypes = value;
  }

  get degreeTypes(): ListData[] {
    return this._degreeTypes;
  }

  @Output() degreeTypeChanged = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.controls['degreeType'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        // it has 8 degree types and target with 2 form types
        const degreeType = Number(res) < 4 ? 'a' : 'b';
        this.degreeTypeChanged.emit(degreeType);
      });
  }
}
