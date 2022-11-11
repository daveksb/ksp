import { FormBuilder, Validators } from '@angular/forms';
import {
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  passportPattern,
  phonePattern,
} from './form-validators';
import { validateIdCard } from './function';

export function createDefaultVisaInfo(fb: FormBuilder) {
  return fb.group({
    visatype: [],
    visaclass: [],
    visaexpiredate: [],
    kuruspano: [],
  });
}

export function createUserInfoForm(fb: FormBuilder) {
  return fb.group({
    id: [],
    idcardno: [
      '',
      [validateIdCard, Validators.required, Validators.pattern(idCardPattern)],
    ],
    kuruspano: ['', [Validators.required, Validators.pattern(idCardPattern)]],
    isforeign: [null],
    passportno: [null],
    passportstartdate: [],
    passportenddate: [],

    prefixth: [null, Validators.required],
    firstnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    middlenameth: [null],
    lastnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],

    prefixen: [null],
    firstnameen: [null, [Validators.pattern(nameEnPattern)]],
    middlenameen: [null],
    lastnameen: [null, [Validators.pattern(nameEnPattern)]],

    sex: [null, Validators.required],
    birthdate: [null, Validators.required],
    position: [null],
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
    affiliation: [null],
  });
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
    prefixen: [null],
    firstnameen: [null],
    lastnameen: [null],
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
    prefixen: [null],
    firstnameen: [null],
    lastnameen: [null],
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
    unitype: [null],
  });
}
