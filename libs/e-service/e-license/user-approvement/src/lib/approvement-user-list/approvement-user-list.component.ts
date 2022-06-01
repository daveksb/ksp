import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export const data = [];

@Component({
  selector: 'ksp-approvement-user-list',
  templateUrl: './approvement-user-list.component.html',
  styleUrls: ['./approvement-user-list.component.scss'],
})
export class ApprovementUserListComponent implements OnInit {
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
    this.router.navigate(['./', 'user-approvement', 'detail']);
  }
}
