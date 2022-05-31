import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

const menu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/home.svg ',
    label: 'หน้าแรก',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นใบคำขอ',
    path: '',
    subMenuName: 'license',
    isExpanded: true,
    subMenu: [
      {
        label: 'ขอใบอนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวไทย)',
        path: 'temp-license/detail?type=1',
      },
      {
        label:
          'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ผู้บริหารสถานศึกษา)',
        path: 'temp-license/detail;type=2',
      },
      {
        label:
          'ขออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาตประกอบวิชาชีพ (ชาวต่างชาติ)',
        path: 'temp-license/detail;type=3',
      },
      {
        label: 'ขอสร้างเลขประจำตัวคุรุสภาสำหรับครูชาวต่างชาติ',
        path: 'temp-license/detail;type=4',
      },
      {
        label: 'ขอหนังสือรับรองคุณวุฒิ',
        path: 'temp-license/detail;type=5',
      },
      {
        label:
          'ขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI)',
        path: 'temp-license/detail;type=6',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/event.svg',
    label: 'ทะเบียนบุคลากรภายในหน่วยงาน',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'ทะเบียนหนังสืออนุญาตประกอบวิชาชีพโดยไม่มีใบอนุญาต',
    path: '',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'รายงาน',
    path: '',
  },
];
@Component({
  selector: 'school-service-container-page',
  templateUrl: './school-service-container-page.component.html',
  styleUrls: ['./school-service-container-page.component.css'],
})
export class SchoolServiceContainerPageComponent implements OnInit {
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
