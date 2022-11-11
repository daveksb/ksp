import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Amphur, Province, SchInfo } from '@ksp/shared/interface';
import {
  AddressService,
  GeneralInfoService,
  SchoolInfoService,
  UniInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

@Component({
  templateUrl: './university-search.component.html',
  styleUrls: ['./university-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    BasicInstituteSearchComponent,
    ReactiveFormsModule,
  ],
})
export class UniversitySearchComponent implements OnInit {
  @Output() confirmed = new EventEmitter<string>();

  provinces$!: Observable<Province[]>;
  amphurs$!: Observable<Amphur[]>;
  universityType$!: Observable<any>;
  selectedUniversity = '';
  searchNotFound = false;

  form = this.fb.group({
    institution: null,
    provinceid: [null, Validators.required],
    amphurid: [null, Validators.required],
    offset: '0',
    row: '25',
  });

  schoolInfos!: any;
  currentPage!: any;
  lastPage!: number;
  payload: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      searchType: string;
      subHeader: string;
      bureauList: any[];
    },
    private fb: FormBuilder,
    private addressService: AddressService,
    private schoolInfoService: SchoolInfoService,
    private uniinfoService: UniInfoService,
    public dialogRef: MatDialogRef<UniversitySearchComponent>,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.getList();
    if (this.data.searchType == 'uni') {
      this.form.controls.provinceid.setValidators([Validators.required]);
      this.form.controls.amphurid.setValidators([Validators.required]);
      this.form.updateValueAndValidity();
    }
  }

  getList() {
    this.provinces$ = this.addressService.getProvinces();
    if (this.data.searchType == 'uni') {
      this.universityType$ = this.uniinfoService.getUniversityType();
    } else {
      if (!this.data.bureauList) {
        this.generalInfoService.getBureau().subscribe((response: any) => {
          if (response) {
            this.data.bureauList = response;
          }
        });
      }
    }
  }

  onItemChange(university: any) {
    this.selectedUniversity = university;
    //console.log('universityCode = ', universityCode);
  }

  search() {
    const data = this.form.getRawValue() as any;
    const { provinceid, amphurid, offset, row } = data;
    let payload = {};
    this.currentPage = 1;
    if (this.data.searchType != 'uni') {
      payload = {
        bureauid: data?.institution?.bureauid,
        schoolid: data?.institution?.schoolid,
        schoolname: data?.institution?.schoolname,
        provinceid,
        amphurid,
        offset,
        row,
      };

      /* console.log('search form  = ', data);
      console.log('search payload = ', payload); */

      this.schoolInfoService.searchSchool(payload).subscribe((res) => {
        if (res && res.length) {
          this.searchNotFound = false;
          this.schoolInfos = this.generateAddressShow(res);
          this.payload = payload;
        } else {
          this.schoolInfos = [];
          this.searchNotFound = true;
        }
      });
    } else {
      if (this.form.valid) {
        payload = {
          typeid: data?.institution?.bureauid,
          unicode: data?.institution?.schoolid,
          uniname: data?.institution?.schoolname,
          provinceid: provinceid,
          amphur_id: amphurid,
          offset,
          row,
        };
        this.uniinfoService.searchUniversity(payload).subscribe((res: any) => {
          this.schoolInfos = this.generateAddressShow(res);
          this.payload = payload;
        });
      }
    }
  }
  generateAddressShow(schoolInfos: SchInfo[]) {
    schoolInfos.forEach((item: any) => {
      const address = this.haveValue(item.address) ? item.address : '';
      const moo = this.haveValue(item.moo) ? 'หมู่ ' + item.moo : '';
      const street = this.haveValue(item.street) ? 'ซอย ' + item.street : '';
      const road = this.haveValue(item.road) ? 'ถนน ' + item.road : '';
      const tumbon = this.haveValue(item.tumbon) ? 'ตำบล ' + item.tumbon : '';
      const amphur = this.haveValue(item.amphurname)
        ? 'อำเภอ ' + item.amphurname
        : '';
      const province = this.haveValue(item.provincename)
        ? 'จังหวัด ' + item.provincename
        : '';
      const zipcode = this.haveValue(item.zipcode) ? item.zipcode : '';
      item.addressShow = `${address} ${moo} ${street} ${road} ${tumbon} ${amphur} ${province} ${zipcode}`;
    });
    return schoolInfos;
  }
  haveValue(value: any) {
    if (value && value !== '-') return true;
    return false;
  }

  clear() {
    this.searchNotFound = false;
    this.schoolInfos = [];
    this.form.reset();
    this.form.patchValue({
      offset: '0',
      row: '20',
    });
  }

  provinceChange(evt: any) {
    const province = evt.target?.value;
    this.amphurs$ = this.addressService.getAmphurs(province);
  }

  goPrevious() {
    if (this.currentPage == 1) return;
    const { offset, ...payload } = this.payload;
    payload.offset = parseInt(offset) - parseInt(payload.row);
    payload.offset = payload.offset.toString();
    if (this.data.searchType != 'uni') {
      this.schoolInfoService.searchSchool(payload).subscribe((res) => {
        this.currentPage -= 1;
        this.schoolInfos = this.generateAddressShow(res);
        this.payload = payload;
      });
    } else {
      this.uniinfoService.searchUniversity(payload).subscribe((res: any) => {
        this.currentPage -= 1;
        this.schoolInfos = this.generateAddressShow(res);
        this.payload = payload;
      });
    }
  }

  goNext() {
    const { offset, ...payload } = this.payload;
    payload.offset = parseInt(offset) + parseInt(payload.row);
    payload.offset = payload.offset.toString();

    if (this.data.searchType != 'uni') {
      this.schoolInfoService.searchSchool(payload).subscribe((res) => {
        this.currentPage += 1;
        this.schoolInfos = this.generateAddressShow(res);
        this.payload = payload;
      });
    } else {
      this.uniinfoService.searchUniversity(payload).subscribe((res: any) => {
        this.currentPage += 1;
        this.schoolInfos = this.generateAddressShow(res);
        this.payload = payload;
      });
    }
  }

  confirm() {
    this.dialogRef.close(this.selectedUniversity);
  }
}

export interface University {
  uniCode: string;
  uniName: string;
  address: string;
  organization: string;
}
