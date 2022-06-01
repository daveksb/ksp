import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export const data = [];
@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  constructor(private router: Router) {}

  data = [];

  ngOnInit(): void {
    this.data = [];
  }

  onItemChange(universityCode: string) {}

  search() {
    this.data = data;
  }

  goToDetail() {
    this.router.navigate(['./', 'staff-management', 'license-search']);
  }

  addStaff() {
    this.router.navigate(['./', 'staff-management', 'staff-person-info']);
  }
}
