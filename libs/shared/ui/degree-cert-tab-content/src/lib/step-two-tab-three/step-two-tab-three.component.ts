import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-tab-3',
  templateUrl: './step-two-tab-three.component.html',
  styleUrls: ['./step-two-tab-three.component.scss'],
})
export class StepTwoTabThreeComponent implements OnInit {
  experienceYearFocused = false;

  form = this.fb.group({
    advisorInfo: [],
    experienceYear: [],
    instructorInfo: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /*     this.form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });
 */
    this.form.controls['experienceYear'].valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }

  get experienceYear() {
    if (this.experienceYearFocused)
      return this.form.controls['experienceYear'].value ?? 99;
    else {
      return 99;
    }
  }
}
