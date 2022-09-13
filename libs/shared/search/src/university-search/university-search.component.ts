import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddressService, RequestLicenseService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

/* export type SearchType = 'uni' | 'school'; */

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
  /* @Input() searchType = ''; */
  /* @Input() subHeader = ''; */
  @Output() confirmed = new EventEmitter<string>();
  provinces$!: Observable<any>;
  amphurs$!: Observable<any>;
  selectedUniversity = '';
  form = this.fb.group({
    institution: null,
    provinceid: null,
    amphurid: null,
    offset: '0',
    row: '25',
  });
  Data: any[] = [];
  currentPage!: number;
  payload: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      searchType: string;
      subHeader: string;
    },
    private fb: FormBuilder,
    private addressService: AddressService,
    private requestLicenseService: RequestLicenseService,
    public dialogRef: MatDialogRef<UniversitySearchComponent>
  ) {}

  ngOnInit(): void {
    this.Data = [];
    this.getList();
    this.form.valueChanges.subscribe((res) => console.log(res));
  }
  getList() {
    this.provinces$ = this.addressService.getProvinces();
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  search() {
    const data = this.form.getRawValue() as any;
    const { provinceid, amphurid, offset, row } = data;
    const payload = {
      bureauid: data?.institution?.organization,
      schoolid: data?.institution?.instituteId,
      schoolname: data?.institution?.instituteName,
      provinceid,
      amphurid,
      offset,
      row,
    };
    this.currentPage = 1;
    this.requestLicenseService.seachSchool(payload).subscribe((res) => {
      this.Data = this.generateAddressShow(res);
      this.payload = payload;
    });
    // this.Data = data;
  }
  generateAddressShow(res: any[]) {
    res.forEach((item: any) => {
      const address = this.haveValue(item.address) ? item.address : '';
      const moo = this.haveValue(item.moo) ? 'หมู่ ' + item.moo : '';
      const street = this.haveValue(item.street) ? 'ซอย ' + item.street : '';
      const road = this.haveValue(item.road) ? 'ถนน ' + item.road : '';
      const tumbon = this.haveValue(item.tumbon) ? 'ตำบล ' + item.tumbon : '';
      const amphur = this.haveValue(item.amphurName)
        ? 'อำเภอ ' + item.amphurName
        : '';
      const province = this.haveValue(item.provinceName)
        ? 'จังหวัด ' + item.provinceName
        : '';
      item.addressShow = `${address} ${moo} ${street} ${road} ${tumbon} ${amphur}  ${province}`;
    });
    return res;
  }
  haveValue(value: any) {
    if (value && value !== '-') return true;
    return false;
  }

  clear() {
    this.Data = [];
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
    this.requestLicenseService.seachSchool(payload).subscribe((res) => {
      this.currentPage -= 1;
      this.Data = this.generateAddressShow(res);
      this.payload = payload;
    });
  }
  goNext() {
    const { offset, ...payload } = this.payload;
    payload.offset = parseInt(offset) + parseInt(payload.row);
    payload.offset = payload.offset.toString();
    this.requestLicenseService.seachSchool(payload).subscribe((res) => {
      this.currentPage += 1;
      this.Data = this.generateAddressShow(res);
      this.payload = payload;
    });
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
