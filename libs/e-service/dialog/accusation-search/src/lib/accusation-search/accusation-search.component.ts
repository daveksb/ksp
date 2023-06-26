import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';

import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'e-service-ethic-ui-accusation-list',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
})
export class AccusationSearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    idcardno: '',
    prefixth: '',
    firstnameth: '',
    lastnameth: '',
    bureauid: '',
    schoolname: '',
    province: '',
    offset: '0',
    row: '20',
  });
  selectedRow: any;
  personSelected = false;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  dataSource2: any;
  identityNo: any;
  currentPage = 1;
  prefixList$!: Observable<any>;
  bureaus$!: Observable<any>;
  provinces$!: Observable<any>;
  selectedIdCard!: any;
  constructor(
    private fb: FormBuilder,
    private service: EthicsService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureaus$ = this.generalInfoService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  search() {
    this.currentPage = 1;
    this.searchPage(this.currentPage);
  }

  clear() {
    this.dataSource.data = [];
  }
  goPrevious() {
    if (this.currentPage == 1) return;
    this.currentPage -= 1;
    this.searchPage(this.currentPage);
  }
  searchPage(page: number) {
    const formValue = this.form.value;
    const payload = replaceEmptyWithNull(formValue);
    payload.offset = String((page - 1) * 20);
    this.service.searchSelfMyInfo(payload).subscribe((res) => {
      this.dataSource.data = res;
    });
  }
  goNext() {
    this.currentPage += 1;
    this.searchPage(this.currentPage);
  }
  onClickRadio(form: any) {
    this.selectedIdCard = form.identitynumber;
  }
  onClickGetInfo(form: any) {
    this.service
      .searchSelfLicense({ identitynumber: form.identitynumber , ilicenseno: form.licenseno })
      .subscribe((res) => {
        console.log(form)
        this.identityNo = form.identitynumber
        this.personSelected = true;
      });
  }
}

export const column = [
  'order',
  'select',
  'view',
  'personId',
  'name',
  'organization',
  'school',
  'province',
];
