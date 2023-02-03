import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-my-reward-list',
  templateUrl: './my-reward-list.component.html',
  styleUrls: ['./my-reward-list.component.scss'],
})
export class MyRewardListComponent implements AfterViewInit {
  badgeTitle = [
    `กรุณาลงทะเบียนรายงานตัวเพื่อยืนยันเข้าเฝ้ารับเข็มเชิดชูเกียรติภายในวันที่ 24/มิ.ย./2564`,
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<PersonLicense>();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  viewDetail(id: number) {
    this.router.navigate(['/reward', 'detail', id]);
  }

  honorPage() {
    this.router.navigate(['/reward', 'honor-request']);
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
    rewardName: 'คุรุสภา',
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
    rewardName: 'ครูผู้สอนดีเด่น',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
  {
    order: 4,
    rewardType: 'ระดับประเทศ',
    professionType: 'ครู',
    rewardName: 'คุรุสดุดี',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
  {
    order: 5,
    rewardType: 'ระดับประเทศ',
    professionType: 'ครู',
    rewardName: 'ครูอาวุโส',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
  {
    order: 6,
    rewardType: 'ระดับประเทศ',
    professionType: 'ครู',
    rewardName: 'ผลงานวิจัยของคุรุสภา',
    requestDate: '1 มิถุนายน 2665',
    announceDate: '1 มิถุนายน 2665',
  },
];
