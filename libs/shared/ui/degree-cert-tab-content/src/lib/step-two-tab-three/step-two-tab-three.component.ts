import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-tab-3',
  templateUrl: './step-two-tab-three.component.html',
  styleUrls: ['./step-two-tab-three.component.scss'],
})
export class StepTwoTabThreeComponent implements OnInit {
  form = this.fb.group({
    advisorInfo: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });
  }
}
