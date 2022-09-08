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
  degree = '';

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
        /* const degreeType = Number(res) < 4 ? 'a' : 'b';
        this.degreeTypeChanged.emit(degreeType); */

        if (Number(res) === 0) {
          this.degree = 'a';
        } else if (Number(res) === 1) {
          this.degree = 'b';
        } else if (Number(res) === 2 || Number(res) === 3) {
          this.degree = 'c';
        } else if (Number(res) === 4 || Number(res) === 5) {
          this.degree = 'd';
        } else if (Number(res) === 6 || Number(res) === 7) {
          this.degree = 'e';
        }

        const degreeType = this.degree;
        this.degreeTypeChanged.emit(degreeType);
      });
  }
}
