import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StaffManagementService } from '../staff-management.service';

@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent {
  form = this.fb.group({
    staffSearch: [],
  });

  schoolId = '0010201056';
  personSelected = false;
  displayedColumns: string[] = [
    'id',
    'idCardNo',
    'name',
    'startDate',
    'endDate',
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
    private service: StaffManagementService
  ) {}

  search() {
    this.service.getStaffs(this.schoolId).subscribe((res) => {
      this.dataSource.data = res;
      console.log('res = ', res);
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail() {
    this.router.navigate(['/staff-management', 'license-search']);
  }

  addStaff() {
    this.router.navigate(['/staff-management', 'staff-person-info']);
  }

  editStaff(staffId: number) {
    this.router.navigate(['/staff-management', 'staff-person-info', staffId]);
  }
}

export interface staffInfo {
  id: number;
  idCardNo: string;
  firstNameTh: string;
  lastNameTh: string;
  startDate: string;
  endDate: string;
  profession: boolean;
  teaching: boolean;
  tempLicense: boolean;
}
