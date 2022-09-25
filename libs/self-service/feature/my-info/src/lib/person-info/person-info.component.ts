import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelfMyInfo } from '@ksp/shared/interface';
import {
  AddressService,
  GeneralInfoService,
  MyInfoService,
} from '@ksp/shared/service';
import {
  nameEnPattern,
  nameThPattern,
  replaceEmptyWithNull,
  validatorMessages,
} from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'self-service-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent implements OnInit {
  status = 'edit';
  label = 'แก้ไขข้อมูล';

  form = this.fb.group({
    firstnameth: ['', [Validators.required, Validators.pattern(nameThPattern)]],
    lastnameth: ['', [Validators.required, Validators.pattern(nameThPattern)]],
    firstnameen: ['', [Validators.required, Validators.pattern(nameEnPattern)]],
    lastnameen: ['', [Validators.required, Validators.pattern(nameEnPattern)]],
    password: [''],
    phone: [''],
    birthdate: [''],
    nationality: [''],
    religion: [''],
    idcardno: [''],
    province: [''],
    email: ['', [Validators.required, Validators.email]],
  });
  baseForm = this.fb.group(new SelfMyInfo());
  provinces$!: Observable<any>;
  nationalitys$!: Observable<any>;
  validatorMessages = validatorMessages;
  constructor(
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      ('');
    });
    this.provinces$ = this.addressService.getProvinces();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      this.form.patchValue(res);
    });
    this.form.disable();
  }

  clearData() {
    this.form.reset();
  }
  get firstNameTh() {
    return this.form.controls.firstnameth;
  }

  get lastNameTh() {
    return this.form.controls.lastnameth;
  }

  get firstNameEn() {
    return this.form.controls.firstnameen;
  }

  get lastNameEn() {
    return this.form.controls.lastnameen;
  }
  get email() {
    return this.form.controls.email;
  }
  onClick() {
    if (this.status == 'edit') {
      this.status = 'save';
      this.label = 'บันทึกข้อมูล';
      this.form.enable();
    } else {
      if (!this.form.valid) return;
      this.baseForm.patchValue(this.form.getRawValue());
      const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
      this.myInfoService
        .updateMyInfo(payload)
        .subscribe((res) => console.log(res));
      this.status = 'edit';
      this.label = 'แก้ไขข้อมูล';
      this.form.disable();
    }
  }
}
