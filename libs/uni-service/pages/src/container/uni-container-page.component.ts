import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SelfServiceUiModule } from '@ksp/self-service/ui';
import { MenuConfig } from '@ksp/shared/interface';
import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';
import { getCookie } from '@ksp/shared/utility';

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
  menu: MenuConfig[] = [
    {
      icon: 'assets/images/icon-sidenav/home.svg ',
      label: 'หน้าแรก',
      path: '/home',
      permission: '1',
    },
    {
      icon: 'assets/images/icon-sidenav/paper.svg',
      label: 'ยื่นแบบคำขอ',
      path: '',
      permission: '',
      subMenu: [
        {
          path: '/degree-cert',
          label: 'ขอรับรองปริญญาและประกาศนียบัตร',
          permission: '1',
        },
        {
          path: '/student-list',
          label: 'ขอยื่นรายชื่อผู้เข้าศึกษา และผู้สำเร็จการศึกษา',
          permission: '2',
        },
        {
          path: '/edit-degree-cert',
          label: 'ขอยื่นเปลี่ยนแปลงรายละเอียดปริญญาและประกาศนียบัตรทางการศึกษา',
          permission: '1',
        },
        {
          path: '/edit-student-list',
          label: 'ขอเปลี่ยนแปลงรายละเอียดรายชื่อผู้เข้าและผู้สำเร็จการศึกษา',
          permission: '2',
        },
        {
          path: '/foreign-student-id',
          label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับนักศึกษาชาวต่างชาติ',
          permission: '2',
        },
      ],
      subMenuName: 'license',
      isExpanded: false,
    },
    {
      icon: 'assets/images/icon-sidenav/display.svg',
      label: 'ทะเบียนข้อมูล',
      path: '',
      permission: '',
      subMenu: [
        {
          path: '/xxx',
          label: 'ทะเบียนข้อมูลหลักสูตรที่รับรองปริญญาและประกาศนียบัตร',
          permission: '',
        },
        {
          path: '/xxx',
          label: 'ข้อมูลรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
          permission: '',
        },
        {
          path: '/xxx',
          label: 'ข้อมูลผลการทดสอบ',
          permission: '',
        },
        {
          path: '/xxx',
          label: 'ข้อมูลผลการประเมินสมรรถนะ',
          permission: '',
        },
      ],
      subMenuName: 'data',
      isExpanded: false,
    },
    {
      icon: 'assets/images/icon-sidenav/file-earmark-text-fill.svg',
      label: 'รายงาน',
      path: '',
      permission: '',
    },
    /* {
      icon: 'assets/images/icon-sidenav/gear-fill.svg',
      label: 'ตั้งค่า',
      path: '',
    }, */
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const permissionright = getCookie('permission');
    this.menuConfig = this.menu.map((data) => {
      if (data.subMenu) {
        data.subMenu = data.subMenu.filter((data) => {
          return data.permission == permissionright;
        });
      }
      return data;
    });
    this.route.data.subscribe((data) => {
      this.header = data['header'];
      this.subHeader = data['subHeader'];
    });
  }
}
