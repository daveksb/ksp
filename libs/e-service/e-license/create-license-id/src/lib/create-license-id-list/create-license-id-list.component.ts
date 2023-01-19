import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { selfOccupyList } from '@ksp/shared/constant';
import { SelfApproveList, SelfApproveListSearch } from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { formatDatePayload } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-create-license-id-list',
  templateUrl: './create-license-id-list.component.html',
  styleUrls: ['./create-license-id-list.component.scss'],
})
export class CreateLicenseIdListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfApproveList>();
  selection = new SelectionModel<any>(true, []);
  licenseTypes = selfOccupyList.filter((i) => i.id < 5);
  form = this.fb.group({
    groupno: [],
    createdate: [],
    careertype: [],
    isforeign: ['1'],
    approvedatefrom: [],
    approvedateto: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: ERequestService,
    private loaderService: LoaderService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search() {
    const form: any = this.form.value;
    const payload: SelfApproveListSearch = formatDatePayload({
      groupno: form.groupno,
      process: 7, //พิจารณาและรับรองคณะกรรมการ กมว.
      status: 2, //ผ่านการพิจารณา
      isforeign: null,
      careertype: form.careertype,
      createdate: form.createdate,
      approvedatefrom: form.approvedatefrom,
      approvedateto: form.approvedateto,
      offset: '0',
      row: '500',
    });
    //console.log('payload = ', payload);
    this.requestService.searchSelfApproveList(payload).subscribe((res) => {
      res = res.map((i) => {
        return { ...i, count: JSON.parse(i.requestlist || '').length };
      });
      this.dataSource.data = res;
    });
  }

  clear() {
    this.form.reset();
    this.dataSource.data = [];
  }

  create() {
    //console.log('this.selection.selected = ', this.selection.selected);
    localForage.setItem('selected-for-create-license', this.selection.selected);
    this.router.navigate(['/create-license-id', 'detail']);
  }
}

const column = [
  'select',
  'group',
  'list',
  'rush',
  'listcount',
  'licenseType',
  'groupType',
  'status',
  'considerDate',
  'verifyDate',
  'approveDate',
];
