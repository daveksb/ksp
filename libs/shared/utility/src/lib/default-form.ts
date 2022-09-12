import {
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  passportPattern,
  phonePattern,
} from './form-validators';

export function createDefaultUserForm(FormBuilder: any, Validators: any) {
  return FormBuilder.group({
    id: [],
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    passportno: [null, [Validators.pattern(passportPattern)]],
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
    nationality: [null, Validators.required],
    country: [null],
  });
}

export function createDefaultVisaInfo(FormBuilder: any) {
  return FormBuilder.group({ visatype: [], visaclass: [], visaenddate: [] });
}
