import { Component } from '@angular/core';

@Component({
  templateUrl: './retired-home.component.html',
  styleUrls: ['./retired-home.component.scss'],
})
export class RetiredHomeComponent {
  data: RetiredInfo[] = [];
  search() {
    this.data = data;
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
