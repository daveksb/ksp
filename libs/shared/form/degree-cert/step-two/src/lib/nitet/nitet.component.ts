import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-step-2-nitet',
  templateUrl: './nitet.component.html',
  styleUrls: ['./nitet.component.scss'],
  providers: providerFactory(NitetComponent),
})
export class NitetComponent extends KspFormBaseComponent implements OnInit {
  experienceYearFocused = false;
  opaciseBox: boolean[] = [];

  nitetForm = this.fb.group({
    generalInfo: [],

    faculty: [],
    status: [],
    subject: [],
    experienceYear: [],
    studentResponsible: [],
    studentOtherCourse: [],

    lessExperience: [],
  });

  override form = this.fb.group({
    nitets: this.fb.array([this.nitetForm]),
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
    this.nitetForm.controls.experienceYear.valueChanges.subscribe((res) => {
      if (res && res > 2) {
        this.nitetForm.controls.lessExperience.reset();
      }
    });
  }

  addNitet() {
    const form = this.fb.group({
      generalInfo: [],
      experienceYear: [],
      faculty: [],
      status: [],
      subject: [],
      studentResponsible: [],
      studentOtherCourse: [],
      lessExperience: [],
    });

    this.nitets.push(form);
  }

  deleteNitet(index: number) {
    this.nitets.removeAt(index);
  }

  get experienceYear() {
    if (this.experienceYearFocused)
      return this.nitetForm.controls.experienceYear.value ?? 99;
    else {
      return 99;
    }
  }

  get nitets() {
    return this.form.controls.nitets;
  }
}
