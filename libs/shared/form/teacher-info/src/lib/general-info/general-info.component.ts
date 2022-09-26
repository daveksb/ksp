import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import _ from 'lodash';

@Component({
  selector: 'ksp-teacher-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  providers: providerFactory(TeacherGeneralInfoComponent),
})
export class TeacherGeneralInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    prefix: [''],
    firstName: [''],
    lastName: [''],
    personId: [''],
    academicPost: [''],
    degrees: this.fb.array([
      this.fb.group({
        name: [''],
        institution: [''],
        year: [''],
      }),
    ]),
  });
  prefixOptions: ListData[] = [];

  override writeValue(value: any) {
    if (value) {
      _.forEach(value?.degrees, (d, index: any) => {
        if (this.form.controls.degrees.controls[index]) {
          this.form.controls.degrees.controls[index].patchValue(d);
        } else {
          this.addDegree();
          this.form.controls.degrees.controls[index].patchValue(d);
        }
      });
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
    this.generalInfoService.getPrefix().subscribe((data) => {
      this.prefixOptions = data?.map(({ id, name_th }: any) => ({
        value: id,
        label: name_th,
      }));
    });
  }

  get degrees() {
    return this.form.controls.degrees;
  }

  addDegree() {
    const degreeform: any = this.fb.group({
      name: [''],
      institution: [''],
      year: [''],
    });
    this.degrees.push(degreeform);
  }

  deleteDegree(degreeIndex: number) {
    this.degrees.removeAt(degreeIndex);
  }
}
