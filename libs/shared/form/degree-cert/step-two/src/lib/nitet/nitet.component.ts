import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import _ from 'lodash';

@Component({
  selector: 'ksp-step-2-nitet',
  templateUrl: './nitet.component.html',
  styleUrls: ['./nitet.component.scss'],
  providers: providerFactory(NitetComponent),
})
export class NitetComponent extends KspFormBaseComponent implements OnInit, OnChanges {
 @Input() maxAmount = 99;
 @Input() minAmount = 0;
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
    nittetAmount: [0],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
        // this.addNitet();
      })
    );
  }
  
  override ngOnChanges(event: any): void {
      if (event.minAmount) {
        this.form.patchValue({nittetAmount: event.minAmount.currentValue})
        this.addNitet(event.minAmount.currentValue);
      }
  }

  override writeValue(value: any): void {
      if (value) {
        const nitetamt = value.nittetAmount || 0;
        if (this.form.controls.nitets.length  < nitetamt) {
          this.addNitet(value.nittetAmount);
        }
        this.form.patchValue({
          nitets: value.nitets,
          nittetAmount: value.nittetAmount
        });
      }
  }

  ngOnInit(): void {
    this.nitetForm.controls.experienceYear.valueChanges.subscribe((res) => {
      if (res && res > 2) {
        this.nitetForm.controls.lessExperience.reset();
      }
    });
  }

  addNitet(amount: number) {
    if (amount) {
      new Array(amount).fill(null).forEach(() => {
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
        if (this.form.controls.nitets.length  < amount) {
          this.form.controls.nitets.push(form);
        }
      });
    }
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
