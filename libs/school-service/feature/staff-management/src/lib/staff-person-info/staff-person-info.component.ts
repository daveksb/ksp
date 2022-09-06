import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { StaffPersonInfoService } from '@ksp/shared/service';

@Component({
  templateUrl: './staff-person-info.component.html',
  styleUrls: ['./staff-person-info.component.scss'],
})
export class StaffPersonInfoComponent implements OnInit {
  staffId!: number;

  countries$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  prefixList$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private staffService: StaffPersonInfoService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
      if (this.staffId) {
        this.pathUserInfo(this.staffId);
        this.patchAddress(this.staffId);
        this.patchEdu(this.staffId);
      }
    });

    this.getListData();
  }

  pathUserInfo(staffId: number) {
    this.staffService.getStaffUserInfo(this.staffId).subscribe((res) => {
      const { id, schoolId, createDate, ...formData } = res;
      formData.birthDate = formData.birthDate.split('T')[0];
      this.form.controls.userInfo.patchValue(formData);
    });
  }

  patchAddress(staffId: number) {
    this.addressService
      .getStaffAddress(this.staffId)
      .subscribe((res: any[]) => {
        //array of address
        res.map((addr, i) => {
          const { schStaffId, ...formData } = addr;
          if (i === 0) {
            this.amphurs1$ = this.addressService.getAmphurs(addr.province);
            this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.addr1.patchValue(formData);
          }
          if (i === 1) {
            this.amphurs2$ = this.addressService.getAmphurs(addr.province);
            this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.addr2.patchValue(formData);
          }
        });
      });
  }

  patchEdu(staffId: number) {
    this.staffService.getStaffEdu(this.staffId).subscribe((res: any[]) => {
      if (res && res.length) {
        res.map((edu, i) => {
          const { schStaffId, ...formData } = edu;
          formData.admissionDate = formData.admissionDate.split('T')[0];
          formData.graduateDate = formData.graduateDate.split('T')[0];
          //console.log('edu form = ', formData);
          if (i === 0) {
            this.form.controls.edu1.patchValue(formData);
          }
          if (i === 1) {
            this.form.controls.edu2.patchValue(formData);
          }
        });
      }
    });
  }

  save() {
    if (this.staffId) {
      this.updateStaff();
    } else {
      this.insertStaff();
    }
  }

  updateStaff() {
    /* "{
  ""userInfo"" : {
    ""id"" : ""2"",
    ""passportNo"" : ""2"",
    ""firstNameTh"" : ""3"",
    ""lastNameTh"" : ""4"",
    ""prefixEn"" : ""5"",
    ""firstNameEn"" : ""6"",
    ""lastNameEn"" : ""7"",
    ""sex"" : ""8"",
    ""birthDate"" : ""2022-08-22T00:00:00"",
    ""email"" : ""10"",
    ""contactPhone"" : ""11"",
    ""workPhone"" : ""12"",
    ""nationality"" : ""13"",
    ""schoolId"" : ""14"",
    ""createDate"" : ""2022-08-22T00:00:00"",
    ""prefixTh"" : ""66""
  },
  ""addr1"" : {
    ""id"" : ""127"",
    ""schstaffid"" : ""2"",
    ""addressType"" : ""16"",
    ""location"" : ""17"",
    ""houseNo"" : ""18"",
    ""moo"" : ""19"",
    ""alley"" : ""20"",
    ""road"" : ""21"",
    ""postcode"" : ""22"",
    ""province"" : ""23"",
    ""amphur"" : ""24"",
    ""tumbol"" : ""25""
  },
  ""edu1"" : {
    ""id"" : ""91"",
    ""schstaffid"" : ""2"",
    ""degreeLevel"" : ""36"",
    ""degreeName"" : ""37"",
    ""isEducationDegree"" : ""38"",
    ""major"" : ""39"",
    ""institution"" : ""40"",
    ""country"" : ""41"",
    ""admissionDate"" : ""2022-08-22T00:00:00"",
    ""graduateDate"" : ""2022-08-22T00:00:00"",
    ""grade"" : ""44"",
    ""otherProperty"" : ""45"",
    ""academicYear"" : ""46""
  },
}
" */
    const formData: any = this.form.getRawValue();
    //formData.userInfo.schoolId = '0010201056';
    //formData.userInfo.nationality = 'TH';
    formData.addr1.schstaffid = this.staffId;
    formData.addr2.schstaffid = this.staffId;
    formData.edu1.schstaffid = this.staffId;
    if (formData && formData.edu2) formData.edu2.schstaffid = this.staffId;

    console.log('update formData = ', formData);
    this.staffService.updateStaff(formData).subscribe((res) => {
      console.log('update staff result = ', res);
    });
  }

  insertStaff() {
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = '0010201056';
    formData.userInfo.nationality = 'TH';
    formData.userInfo.createDate = new Date().toISOString();
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    console.log('insert formData = ', formData);
    /*     this.staffService.addStaff(formData).subscribe((res) => {
      console.log('add staff result = ', res);
      this.router.navigate(['/staff-management', 'staff-person-info', res.id]);
    }); */
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;

    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  provinceChanged(type: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (type === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (type === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(type: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (type === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (type === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();
  }

  nextPage() {
    this.router.navigate([
      '/staff-management',
      'staff-teaching-info',
      this.staffId,
    ]);
  }

  get addr1(): any {
    return this.form.controls.addr1;
  }

  get addr2(): any {
    return this.form.controls.addr2;
  }
}
