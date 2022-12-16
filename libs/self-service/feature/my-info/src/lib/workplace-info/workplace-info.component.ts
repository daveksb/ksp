import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  Amphur,
  Bureau,
  FormMode,
  Province,
  SelfMyInfo,
  Tambol,
} from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  MyInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-workplace-info',
  templateUrl: './workplace-info.component.html',
  styleUrls: ['./workplace-info.component.scss'],
})
export class WorkplaceInfoComponent implements OnInit {
  label = 'แก้ไขข้อมูล';
  mode: FormMode = 'view';
  provinces1$!: Observable<Province[]>;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  bureau$!: Observable<Bureau[]>;
  baseForm = this.fb.group(new SelfMyInfo());
  form = this.fb.group({
    workplace: [],
  });

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private educationDetailService: EducationDetailService,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      this.patchWorkPlace(res);
    });
  }

  getListData() {
    this.bureau$ = this.educationDetailService.getBureau();
    this.provinces1$ = this.addressService.getProvinces();
  }

  patchWorkPlace(res: SelfMyInfo) {
    console.log('res = ', res);
    const workplace = JSON.parse(`${res?.schooladdrinfo}`);
    this.amphurs1$ = this.addressService.getAmphurs(workplace.province);
    this.tumbols1$ = this.addressService.getTumbols(workplace.amphur);
    this.form.patchValue({ workplace });
  }

  public provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      }
    }
  }

  public amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  onClickChangeMode() {
    if (this.mode == 'view') {
      this.mode = 'edit';
      this.label = 'บันทึกข้อมูล';
    } else {
      this.savingData();
      this.mode = 'view';
      this.label = 'แก้ไขข้อมูล';
    }
  }

  savingData() {
    const formData = this.form.value;
    //console.log('form data = ', formData.workplace);
    this.baseForm.patchValue({
      schooladdrinfo: JSON.stringify(formData.workplace),
    });
    const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
    console.log('payload = ', payload);
    this.myInfoService.updateMyInfo(payload).subscribe((res) => {
      //console.log('update res = ', res);
    });
  }

  clearData() {
    this.form.reset();
  }
}
