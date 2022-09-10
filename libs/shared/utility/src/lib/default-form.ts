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
    idCardNo: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    passportNo: [null, [Validators.pattern(passportPattern)]],
    passportStartDate: [],
    passportEndDate: [],
    prefixTh: [null, Validators.required],
    firstNameTh: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    middleNameTh: [],
    lastNameTh: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    prefixEn: [null, Validators.required],
    firstNameEn: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    middleNameEn: [null],
    lastNameEn: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    sex: [null, Validators.required],
    birthDate: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactPhone: [
      null,
      [Validators.required, Validators.pattern(phonePattern)],
    ],
    workPhone: [null, [Validators.required, Validators.pattern(phonePattern)]],
    nationality: ['TH'],
    country: [],
    visatype: [],
    visaclass: [],
    visaenddate: [],
  });
}
