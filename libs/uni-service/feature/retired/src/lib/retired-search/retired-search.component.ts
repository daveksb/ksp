import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uni-service-retired-search',
  templateUrl: './retired-search.component.html',
  styleUrls: ['./retired-search.component.scss'],
})
export class RetiredSearchComponent {
  data: RetiredInfo[] = [];
  constructor(private router: Router) {}

  search() {
    this.data = data;
  }

  clear() {
    this.data = [];
  }

  confirm() {
    this.router.navigate(['/', 'retired', 'reason']);
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
