import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { staffLicenseTypes } from '@ksp/shared/constant';
import { ListData, PositionType, SchStaff } from '@ksp/shared/interface';
import { LoaderService, StaffService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  idCardLabel = `หมายเลขบัตรประชาชน/เลขคุรุสภาสำหรับชาวต่างชาติ`;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  positions$!: Observable<PositionType[]>;
  licenseTypes: ListData[] = staffLicenseTypes;
  searchNotFound = false;
  schoolId = getCookie('schoolId');
  dataSource = new MatTableDataSource<SchStaff>();
  form = this.fb.group({
    searchFilter: [],
  });
  displayedColumns: string[] = [
    'id',
    'idcardno',
    'name',
    'startdate',
    'enddate',
    // 'profession',
    // 'tempLicense',
    // 'teaching',
    'edit',
    'view',
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: StaffService,
    private loaderService: LoaderService
  ) {
    this.positions$ = this.service.getPositionTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(filter: any) {
    //console.log('filter = ', filter);
    //console.log('school id = ', this.schoolId);
    const payload = {
      licenseno: filter.licenseno,
      name: filter.name,
      cardno: filter.cardno,
      teachinglevel: filter.teachinglevel,
      position: filter.position,
      schoolid: `${this.schoolId}`,
      offset: '0',
      row: '100',
    };

    this.service.searchStaffs(payload).subscribe((res) => {
      if (res) {
        res.map((i: any) => {
          if (i && i.hiringinfo) {
            const temp = JSON.parse(i.hiringinfo);
            i.startdate = temp.startDate;
            i.enddate = temp.endDate;
            this.searchNotFound = false;
          }
        });
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }

      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      const sortState: Sort = { active: 'id', direction: 'desc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.dataSource.data = [];
    this.searchNotFound = false;
  }

  searchLicense() {
    this.router.navigate(['/staff-management', 'license-search']);
  }

  viewStaff(staffId: number) {
    this.router.navigate(['/staff-management', 'view-staff', staffId]);
  }

  addStaff() {
    this.router.navigate(['/staff-management', 'add-staff']);
  }

  editStaff(staffId: number) {
    this.router.navigate(['/staff-management', 'edit-staff', staffId]);
  }
}
