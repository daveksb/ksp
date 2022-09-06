import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '../shared-form-others.module';

@Component({
  selector: 'ksp-form-education-info-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedFormOthersModule],
  templateUrl: './form-education-info-manager.component.html',
  styleUrls: ['./form-education-info-manager.component.scss'],
})
export class FormEducationInfoManagerComponent implements OnInit {
  form = this.fb.group({
    degree1: [],
    degree2: [],
    degree3: [],
    degree4: [],
    degree5: [],
    degree6: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //console.log('exp form = ', res);
    });
  }

  get degree1() {
    return this.form.controls.degree1.value;
  }

  get degree2() {
    return this.form.controls.degree2.value;
  }

  get degree3() {
    return this.form.controls.degree3.value;
  }

  get degree4() {
    return this.form.controls.degree4.value;
  }

  get degree5() {
    return this.form.controls.degree5.value;
  }

  get degree6() {
    return this.form.controls.degree6.value;
  }
}
