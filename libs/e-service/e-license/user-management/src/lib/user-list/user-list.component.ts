import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export const data = [];

@Component({
  selector: 'ksp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private router: Router) {}
  selectedUniversity = '';

  data = [];

  ngOnInit(): void {
    this.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    console.log('universityCode = ', universityCode);
  }

  search() {
    this.data = data;
  }

  goToDetail() {
    this.router.navigate(['./', 'user-management', 'detail']);
  }
}
