import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { idCardPattern, providerFactory, validatorMessages } from '@ksp/shared/utility';
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
    personId: ['', Validators.pattern(idCardPattern)],
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
  validIdcard = true;
  validatorMessages = validatorMessages;

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

  checkID(event: any) {
    const id = event?.target.value;
    if (id.length != 13) {
      this.validIdcard = false;
      return;
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(id.charAt(i)) * (13 - i);
    }
    const mod = sum % 11;
    const check = (11 - mod) % 10;
    if (check == parseInt(id.charAt(12))) {
      this.validIdcard = true;
    } else {
      this.validIdcard = false;
    }
  }

  get idCardNo() {
    return this.form.controls.personId;
  }

}
