import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StaffService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements AfterViewInit {
  positions$!: Observable<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  form = this.fb.group({
    searchFilter: [],
  });

  schoolId = '0010201056';
  displayedColumns: string[] = [
    'id',
    'idcardno',
    'name',
    'startdate',
    'enddate',
    'profession',
    'teaching',
    'tempLicense',
    'edit',
    'view',
  ];
  dataSource = new MatTableDataSource<staffInfo>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: StaffService
  ) {
    this.positions$ = this.service.getPositionTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(filter: any) {
    console.log('filter = ', filter);
    const payload = {
      licenseno: filter.licenseno,
      name: filter.name,
      cardno: filter.cardno,
      teachinglevel: filter.teachinglevel,
      position: filter.position,
      schoolId: `${this.schoolId}`,
      offset: '0',
      row: '100',
    };

    this.service.searchStaffs(payload).subscribe((res) => {
      console.log('res = ', res);
      /*       res.map((i: any) => {
        const temp = parseJson(i.hiringinfo);
        i.startdate = temp.startDate;
        i.enddate = temp.endDate;
      }); */

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

export interface staffInfo {
  id: number;
  idcardno: string;
  firstnameth: string;
  lastnameth: string;
  startdate: string;
  enddate: string;
  profession: boolean;
  teaching: boolean;
  tempLicense: boolean;
}
