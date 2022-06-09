import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

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
        path: 'foreign-id',
        label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับนักศึกษาชาวต่างชาติ',
      },
      {
        path: 'graduate-list',
        label: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
      },
      {
        path: 'change-degree-info',
        label: 'ขอเปลี่ยนแปลงรายละเอียดปริญญาและประกาศนียบัตร',
      },
      {
        path: 'change-student-list',
        label: 'ขอเปลี่ยนแปลงรายละเอียดรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
      },
    ],
    subMenuName: 'license',
    isExpanded: true,
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ทะเบียนข้อมูล',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'รายงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'ตั้งค่า',
    path: '',
  },
];

@Component({
  selector: 'uni-service-container-page',
  templateUrl: './uni-service-container-page.component.html',
  styleUrls: ['./uni-service-container-page.component.css'],
})
export class UniServiceContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];
  header = '';
  subHeader = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.menuConfig = menu;

    this.route.data.subscribe((data) => {
      this.header = data['header'];
      this.subHeader = data['subHeader'];
      console.log('test', data);
    });
  }
}
