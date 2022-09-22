import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-my-reward-list',
  templateUrl: './my-reward-list.component.html',
  styleUrls: ['./my-reward-list.component.scss'],
})
export class MyRewardListComponent implements OnInit {
  badgeTitle = [
    `กรุณาลงทะเบียนรายงานตัวเพื่อยืนยันเข้าเฝ้ารับเข็มเชิดชูเกียรติภายในวันที่ 24/มิ.ย./2564  กดเพื่อตรวจสอบ`,
  ];

  constructor(private router: Router) {}

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<PersonLicense>();

  ngOnInit(): void {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  viewDetail() {
    this.router.navigate(['/', 'reward', 'detail']);
  }

  honorPage() {
    this.router.navigate(['/', 'reward', 'honor-request']);
  }
}

export const column = [
  'order',
  'rewardType',
  'professionType',
  'rewardName',
  'requestDate',
  'announceDate',
  'view',
];

export interface PersonLicense {
  order: number;
  rewardType: string;
  professionType: string;
  rewardName: string;
  requestDate: string;
  announceDate: string;
}

export const data: PersonLicense[] = [
  {
    order: 1,
    rewardType: 'ระดับจังหวัด',
    professionType: 'ครู',
    rewardName: 'ครูภาษาไทยดีเด่น',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
  {
    order: 2,
    rewardType: 'ระดับจังหวัด',
    professionType: 'ครู',
    rewardName: 'ครูภาษาไทยดีเด่น',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
  {
    order: 3,
    rewardType: 'ระดับจังหวัด',
    professionType: 'ครู',
    rewardName: 'ครูภาษาไทยดีเด่น',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
  {
    order: 4,
    rewardType: 'ระดับประเทศ',
    professionType: 'ครู',
    rewardName: 'ครูภาษาไทยดีเด่น',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
];
