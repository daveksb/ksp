import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-step-3-tab-1',
  templateUrl: './step-three-tab-one.component.html',
  styleUrls: ['./step-three-tab-one.component.scss'],
})
export class StepThreeTabOneComponent implements OnInit {
  step3tab1Form = this.fb.group({
    years: this.fb.array([]),
    terms: this.fb.array([]),
    hours: this.fb.array([]),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /* this.step1Form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    }); */

    this.addYear();
    this.addTerm();
    this.addHours();
  }

  addYear() {
    const yearForm = this.fb.group({ title: [''] });
    this.years.push(yearForm);
  }

  addTerm() {
    const termForm = this.fb.group({ title: [''] });
    this.terms.push(termForm);
  }

  addHours() {
    const hourForm = this.fb.group({ title: [''] });
    this.hours.push(hourForm);
  }

  deleteYear(index: number) {
    this.years.removeAt(index);
  }

  deleteTerm(index: number) {
    this.terms.removeAt(index);
  }

  deleteHour(index: number) {
    this.hours.removeAt(index);
  }

  get years() {
    return this.step3tab1Form.controls['years'] as FormArray;
  }

  get terms() {
    return this.step3tab1Form.controls['terms'] as FormArray;
  }

  get hours() {
    return this.step3tab1Form.controls['hours'] as FormArray;
  }
}
