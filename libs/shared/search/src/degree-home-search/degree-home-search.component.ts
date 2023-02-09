import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import _ from 'lodash';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
@Component({
  selector: 'ksp-degree-home-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './degree-home-search.component.html',
  styleUrls: ['./degree-home-search.component.scss'],
  providers: providerFactory(DegreeHomeSearchComponent),
})
export class DegreeHomeSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();
  @Output() selectChange = new EventEmitter<any>();

  @Input() degreeLevelOptions: ListData[] = [];
  @Input() fieldOfStudyOptions: ListData[] = [];
  @Input() majorOptions: ListData[] = [];
  @Input() subjectOptions: ListData[] = [];
  @Input() academicYearOptions: ListData[] = [];
  @Input() provinces: ListData[] = [];
  @Input() universityType: ListData[] = [];
  @Input() universities: ListData[] = [];
  calendaryearList: ListData[] = [];

  override form = this.fb.group({
    university: [],
    universityType: [],
    degreeCode: [],
    degreeName: [],
    degreeLevel: [],
    fieldOfStudy: [],
    major: [],
    subject: [],
    year: [],
    province: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    const currYear = new Date().getFullYear();
    for (let index = 0; index < 10; index++) {
      this.calendaryearList.push({
        value: ((currYear - index) + 543).toString(),
        label: ((currYear - index) + 543).toString()
      })
    }
  }

  onSelectChange(e: any, key: any) {
    this.selectChange.emit({ value: e?.target?.value, key });
  }
}
