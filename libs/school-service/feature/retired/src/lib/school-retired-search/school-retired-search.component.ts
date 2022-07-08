import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-school-retired-search',
  templateUrl: './school-retired-search.component.html',
  styleUrls: ['./school-retired-search.component.scss'],
})
export class SchoolRetiredSearchComponent {
  constructor(private router: Router) {}

  data: RetiredInfo[] = [];
  search() {
    this.data = data;
  }

  confirm() {
    this.router.navigate(['/', 'retired-user', 'requester']);
  }
}

export interface RetiredInfo {
  retiredRole: string;
  retiredName: string;
  retiredPhone: string;
}

export const data: RetiredInfo[] = [
  {
    retiredRole:
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    retiredName: 'นาย พิชัย ชาญชัญ',
    retiredPhone: '081-9872676',
  },
  {
    retiredRole:
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    retiredName: 'นาย พิชัย ชาญชัญ',
    retiredPhone: '081-9872676',
  },
  {
    retiredRole:
      'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)',
    retiredName: 'นาย พิชัย ชาญชัญ',
    retiredPhone: '081-9872676',
  },
];
