import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '../shared-form-others.module';
import { providerFactory } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { experiences } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-form-teaching-info-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-teaching-info-manager.component.html',
  styleUrls: ['./form-teaching-info-manager.component.scss'],
  providers: providerFactory(FormTeachingInfoManagerComponent),
})
export class FormTeachingInfoManagerComponent extends KspFormBaseComponent {
  experiences = experiences;

  override form = this.fb.group({
    teachingExperience: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    super();
    this.addCheckboxes();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  private addCheckboxes() {
    this.experiences.forEach(() =>
      this.teachingExperience.push(this.fb.control([null]))
    );
  }

  get teachingExperience() {
    return this.form.controls.teachingExperience as FormArray;
  }
}
