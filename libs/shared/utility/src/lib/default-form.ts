import { FormBuilder, Validators } from '@angular/forms';
import {
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  passportPattern,
  phonePattern,
} from './form-validators';

export function createDefaultUserInfoForm(fb: FormBuilder) {
  return fb.group({
    id: [],
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    passportno: [
      null,
      [Validators.required, Validators.pattern(passportPattern)],
    ],
    passportstartdate: [],
    passportenddate: [],
    prefixth: [null, Validators.required],
    firstnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    middlenameth: [],
    lastnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    prefixen: [null, Validators.required],
    firstnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    middlenameen: [null],
    lastnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    sex: [null, Validators.required],
    birthdate: [null, Validators.required],
    position: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactphone: [
      null,
      [Validators.required, Validators.pattern(phonePattern)],
    ],
    workphone: [null, [Validators.required, Validators.pattern(phonePattern)]],
    nationality: [null],
    country: [null],
    visaclass: [null],
    visatype: [null],
    visaenddate: [null],
    educationOccupy: [null],
    permisson: [null],
    other: [null],
    affiliation: [null]
  });
}

export function createDefaultVisaInfo(FormBuilder: any) {
  return FormBuilder.group({ visatype: [], visaclass: [], visaenddate: [] });
}

export function createUniUserInfoForm(fb: FormBuilder) {
  return fb.group({
    id: [],
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    prefixth: [null, Validators.required],
    firstnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    lastnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    prefixen: [null, Validators.required],
    firstnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    lastnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    position: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactphone: [
      null,
      [Validators.required, Validators.pattern(phonePattern)],
    ],
    workphone: [null, [Validators.required, Validators.pattern(phonePattern)]],
    nationality: [null],
    country: [null],
    visaclass: [null],
    visatype: [null],
    visaenddate: [null],
    educationoccupy: [null],
    permission: [null],
    other: [null],
    unitype: [null, [Validators.required]]
  });
}

export function createUniCoordinatorForm(fb: FormBuilder) {
  return fb.group({
    id: [],
    prefixth: [null, Validators.required],
    firstnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    lastnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    prefixen: [null, Validators.required],
    firstnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    lastnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    position: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactphone: [
      null,
      [Validators.required, Validators.pattern(phonePattern)],
    ],
    workphone: [null, [Validators.required, Validators.pattern(phonePattern)]],
    nationality: [null],
    country: [null],
    visaclass: [null],
    visatype: [null],
    visaenddate: [null],
    educationoccupy: [null],
    permission: [null],
    other: [null],
    unitype: [null]
  });
}