import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StaffService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';

@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent {
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
  ) {}

  search() {
    const payload = {
      schoolid: `${this.schoolId}`,
    };
    this.service.searchStaffsFromFilter(payload).subscribe((res) => {
      res.map((i: any) => {
        const temp = parseJson(i.hiringinfo);
        i.startdate = temp.startDate;
        i.enddate = temp.endDate;
      });

      this.dataSource.data = res;
      //console.log('res = ', res);
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
