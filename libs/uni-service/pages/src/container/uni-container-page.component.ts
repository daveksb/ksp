import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SelfServiceUiModule } from '@ksp/self-service/ui';
import {
  MenuConfig,
  SharedMenuModule,
  TopNavComponent,
} from '@ksp/shared/menu';

@Component({
  selector: 'uni-service-container-page',
  templateUrl: './uni-container-page.component.html',
  styleUrls: ['./uni-container-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiModule,
    SharedMenuModule,
    TopNavComponent,
  ],
})
export class UniContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];
  header = '';
  subHeader = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.menuConfig = menu;
    this.route.data.subscribe((data) => {
      this.header = data['header'];
      this.subHeader = data['subHeader'];
    });
  }
}

export const menu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/home.svg ',
    label: 'หน้าแรก',
    path: 'home',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นใบคำขอ',
    path: '',
    subMenu: [
      {
        path: 'degree-cert',
        label: 'ขอรับรองปริญญาและประกาศนียบัตร',
      },
      {
        path: 'foreign-student-id',
        label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับนักศึกษาชาวต่างชาติ',
      },
      {
        path: 'admission',
        label: 'ขอยื่นรายชื่อผู้เข้าศึกษา',
      },
      {
        path: 'graduate',
        label: 'ขอยื่นรายชื่อผู้สำเร็จการศึกษา',
      },
      {
        path: 'edit-degree',
        label: 'ขอเปลี่ยนแปลงรายละเอียดปริญญาและประกาศนียบัตร',
      },
      {
        path: 'edit-student',
        label: 'ขอเปลี่ยนแปลงรายละเอียดรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
      },
    ],
    subMenuName: 'license',
    isExpanded: false,
  },
  {
    icon: 'assets/images/icon-sidenav/display.svg',
    label: 'ทะเบียนข้อมูล',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/file-earmark-text-fill.svg',
    label: 'รายงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/gear-fill.svg',
    label: 'ตั้งค่า',
    path: '',
  },
];
