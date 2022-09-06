import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '../shared-form-others.module';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-education-info-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedFormOthersModule],
  templateUrl: './form-education-info-manager.component.html',
  styleUrls: ['./form-education-info-manager.component.scss'],
  providers: providerFactory(FormEducationInfoManagerComponent),
})
export class FormEducationInfoManagerComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    degree1: [],
    degree2: [],
    degree3: [],
    degree4: [],
    degree5: [],
    degree6: [],
    edu1: [],
    edu2: [],
    edu3: [],
    edu4: [],
    edu5: [],
    other: [],
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
