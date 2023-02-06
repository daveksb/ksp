import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuConfig } from '@ksp/shared/interface';
import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';
import { MyInfoService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';

@Component({
  templateUrl: './self-service-master-page.component.html',
  styleUrls: ['./self-service-master-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SharedMenuModule, TopNavComponent],
})
export class SelfServiceMasterPageComponent implements OnInit {
  menuConfig!: MenuConfig[];
  myName = '';
  lastLogin = '';

  constructor(private myInfoService: MyInfoService) {
    localForage.getItem('my-info').then((res: any) => {
      this.myName = res.firstnameth + ' ' + res.lastnameth;
      this.lastLogin = thaiDate(new Date(res.lastlogintime as string));
      this.menuConfig = getMenu(res.usertype);
    });
  }

  ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      if (res) {
        this.menuConfig = getMenu(res.usertype);
      }
    });
  }
}

const getMenu = (userType: string | null) => {
  return userType === '1'
    ? [
        {
          icon: 'assets/images/icon-sidenav/home.svg ',
          label: 'หน้าแรก',
          path: '/home',
        },
        {
          icon: 'assets/images/icon-sidenav/paper.svg',
          label: 'ยื่นแบบคำขอ',
          path: '',
          subMenuName: 'request',
          subMenu: [
            {
              label: 'ขอขึ้นทะเบียนหนังสืออนุญาตประกอบวิชาชีพ',
              path: '',
              subMenuName: 'registerLicense',
              subMenu: [
                {
                  label: 'ครู',
                  path: '/license/teacher',
                },
                {
                  label: 'ผู้บริหารสถานศึกษา',
                  path: '/license/school-manager',
                },
                /* {
                  label: 'ครู',
                  path: '',
                  subMenuName: 'teacherType',
                  subMenu:
                    userType === '1'
                      ? [
                          {
                            label: 'ครูชาวไทย',
                            path: '/license/teacher',
                          },
                        ]
                      : [
                          {
                            label: 'Foreign Teacher',
                            path: '/license/agreement',
                            params: { type: 1 },
                          },
                        ],
                }, */
                /* {
                  label: 'ผู้บริหารสถานศึกษา',
                  path: '',
                  subMenuName: 'manageType',
                  subMenu:
                    userType === '1'
                      ? [
                          {
                            label: 'ผู้บริหารสถานศึกษาชาวไทย',
                            path: '/license/school-manager',
                          },
                        ]
                      : [
                          {
                            label: 'Foreign',
                            path: '/license/agreement',
                            params: { type: 2 },
                          },
                        ],
                }, */
                {
                  label: 'ผู้บริหารการศึกษา',
                  path: '/license/education-manager',
                },
                {
                  label: 'ศึกษานิเทศก์',
                  path: '/license/study-supervision',
                },
              ],
            },
            {
              label: 'ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ',
              path: '/renew-license/request',
              subMenuName: 'renewLicense',
              subMenu: [
                {
                  label: 'ครู',
                  path: '/renew-license/request',
                },
                {
                  label: 'ผู้บริหารสถานศึกษา',
                  path: '/renew-license/school-manager',
                },
                /* {
                  label: 'ครู',
                  path: '',
                  subMenuName: 'teacherType',
                  subMenu:
                    userType === '1'
                      ? [
                          {
                            label: 'ครูชาวไทย',
                            path: '/renew-license/request',
                          },
                        ]
                      : [
                          {
                            label: 'Foreign Teacher',
                            path: '/renew-license/foreign',
                            params: { type: 1 },
                          },
                        ],
                },
                {
                  label: 'ผู้บริหารสถานศึกษา',
                  path: '',
                  subMenuName: 'manageType',
                  subMenu:
                    userType === '1'
                      ? [
                          {
                            label: 'ผู้บริหารสถานศึกษาชาวไทย',
                            path: '/renew-license/school-manager',
                          },
                        ]
                      : [
                          {
                            label: 'Foreign',
                            path: '/renew-license/foreign',
                            params: { type: 2 },
                          },
                        ],
                }, */
                {
                  label: 'ผู้บริหารการศึกษา',
                  path: '/renew-license/education-manager',
                },
                {
                  label: 'ศึกษานิเทศก์',
                  path: '/renew-license/study-supervision',
                },
              ],
            },
            {
              label: 'ขอเปลี่ยนแปลง/แก้ไขหนังสืออนุญาตประกอบวิชาชีพ',
              path: '/license/edit',
            },
            {
              label: 'ขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ',
              path: '/substitute-license/request',
            },
            {
              label: 'ขอหนังสือรับรองความรู้',
              path: '/transfer-knowledge/request',
            },
            {
              label: 'ขอยื่นเทียบเคียงความรู้',
              path: '/compare-knowledge/request',
            },
            {
              label: 'ขอคืนเงินค่าธรรมเนียม',
              path: '/refund-fee/request',
            },
            {
              label: 'ขอรับรางวัลการยกย่องเชิดชูเกียรติ',
              path: '/reward/request',
            },
          ],
        },
        {
          icon: 'assets/images/icon-sidenav/card.svg',
          label: 'หนังสืออนุญาตประกอบวิชาชีพ',
          path: '/license/*',
        },
        {
          icon: 'assets/images/icon-sidenav/event.svg',
          label: 'กิจกรรมการพัฒนาตัวเอง',
          path: '/self-improvement/request',
        },
        {
          icon: 'assets/images/icon-sidenav/reward.svg',
          label: 'รางวัลของฉัน',
          path: '/reward/list',
        },
        {
          icon: 'assets/images/icon-sidenav/people.svg',
          label: 'ข้อมูลของฉัน',
          path: '',
          subMenuName: 'myInfo',
          subMenu: [
            {
              label: 'ข้อมูลส่วนตัว',
              path: '/my-info/person-info',
            },
            {
              label: 'ที่อยู่',
              path: '/my-info/address-info',
            },
            {
              label: 'สถานที่ทำงาน',
              path: '/my-info/workplace-info',
            },
            {
              label: 'ข้อมูลการศึกษา',
              path: '/my-info/education-info',
            },
            {
              label: 'ข้อมูลประสบการณ์วิชาชีพ',
              path: '/my-info/profession-experience',
            },
            {
              label: 'ข้อมูลผลการประเมินสมรรถนะ',
              path: '/my-info/performance-result',
            },
          ],
        },
        {
          icon: 'assets/images/icon-sidenav/paper.svg',
          label: 'ประวัติการชำระเงิน',
          path: '/my-info/payment-history',
        },
      ]
    : [
        {
          icon: 'assets/images/icon-sidenav/home.svg ',
          label: 'First page',
          path: '/home',
        },
        {
          icon: 'assets/images/icon-sidenav/paper.svg',
          label: 'Complete online Application Form',
          path: '',
          subMenuName: 'request',
          subMenu: [
            {
              label: 'Registration of License-Foreign Teacher',
              path: '',
              subMenuName: 'registerLicense',
              subMenu: [
                {
                  label: 'Teacher',
                  path: '/license/agreement',
                  params: { type: 1 },
                  /* subMenuName: 'teacherType',
                  subMenu: [
                    {
                      label: 'Foreign',
                      path: '/license/agreement',
                      params: { type: 1 },
                    },
                  ], */
                },
                {
                  label: 'Educational Institution',
                  path: '/license/agreement',
                  params: { type: 2 },
                  /* subMenuName: 'manageType',
                  subMenu: [
                    {
                      label: 'Foreign',
                      path: '/license/agreement',
                      params: { type: 2 },
                    },
                  ], */
                },
              ],
            },
            {
              label: 'Renewal of License-Foreign Teacher',
              path: '/renew-license/request',
              subMenuName: 'renewLicense',
              subMenu: [
                {
                  label: 'Teacher',
                  path: '/renew-license/foreign',
                  params: { type: 1 },
                  /* subMenuName: 'teacherType',
                  subMenu: [
                    {
                      label: 'Foreign',
                      path: '/renew-license/foreign',
                      params: { type: 1 },
                    },
                  ], */
                },
                {
                  label: 'Educational Institution',
                  path: '/renew-license/foreign',
                  params: { type: 2 },
                  /* subMenuName: 'manageType',
                  subMenu: [
                    {
                      label: 'Foreign',
                      path: '/renew-license/foreign',
                      params: { type: 2 },
                    },
                  ], */
                },
              ],
            },
            {
              label: 'Personal Information Change Request',
              path: '/license/edit',
            },
            {
              label: 'Substitute License',
              path: '/substitute-license/request',
            },
          ],
        },
        {
          icon: 'assets/images/icon-sidenav/card.svg',
          label: 'Temporary Permit For Professional Educators',
          path: '/license/*',
        },
        {
          icon: 'assets/images/icon-sidenav/event.svg',
          label: 'Self development activities',
          path: '/self-improvement/request',
        },
        {
          icon: 'assets/images/icon-sidenav/people.svg',
          label: 'Personal Details',
          path: '',
          subMenuName: 'myInfo',
          subMenu: [
            {
              label: 'Personal Details',
              path: '/my-info/person-info',
            },
            {
              label: 'Address',
              path: '/my-info/address-info',
            },
            {
              label: 'Work Place',
              path: '/my-info/workplace-info',
            },
            {
              label: 'Academic Details',
              path: '/my-info/education-info',
            },
            {
              label: 'Experience Details',
              path: '/my-info/profession-experience',
            },
            {
              label: 'Evaluation Details',
              path: '/my-info/performance-result',
            },
          ],
        },
        {
          icon: 'assets/images/icon-sidenav/paper.svg',
          label: 'Payment Information',
          path: '/my-info/payment-history',
        },
      ];
};

export const menu: MenuConfig[] = [
  {
    icon: 'assets/images/icon-sidenav/home.svg ',
    label: 'หน้าแรก',
    path: '/home',
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ยื่นแบบคำขอ',
    path: '',
    subMenuName: 'request',
    subMenu: [
      {
        label: 'ขอขึ้นทะเบียนหนังสืออนุญาตประกอบวิชาชีพ',
        path: '',
        subMenuName: 'registerLicense',
        subMenu: [
          {
            label: 'ครู',
            path: '',
            subMenuName: 'teacherType',
            subMenu: [
              {
                label: 'ครูชาวไทย',
                path: '/license/teacher',
              },
              {
                label: 'ครูชาวต่างชาติ',
                path: '/license/agreement',
                params: { type: 1 },
              },
            ],
          },
          {
            label: 'ผู้บริหารสถานศึกษา',
            path: '',
            subMenuName: 'manageType',
            subMenu: [
              {
                label: 'ผู้บริหารสถานศึกษาชาวไทย',
                path: '/license/school-manager',
              },
              {
                label: 'ผู้บริหารสถานศึกษาชาวต่างชาติ',
                path: '/license/agreement',
                params: { type: 2 },
              },
            ],
          },
          {
            label: 'ผู้บริหารการศึกษา',
            path: '/license/education-manager',
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/license/study-supervision',
          },
        ],
      },
      {
        label: 'ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ',
        path: '/renew-license/request',
        subMenuName: 'renewLicense',
        subMenu: [
          {
            label: 'ครู',
            path: '',
            subMenuName: 'teacherType',
            subMenu: [
              {
                label: 'ครูชาวไทย',
                path: '/renew-license/request',
              },
              {
                label: 'ครูชาวต่างชาติ',
                path: '/renew-license/foreign',
                params: { type: 1 },
              },
            ],
          },
          {
            label: 'ผู้บริหารสถานศึกษา',
            path: '',
            subMenuName: 'manageType',
            subMenu: [
              {
                label: 'ผู้บริหารสถานศึกษาชาวไทย',
                path: '/renew-license/school-manager',
              },
              {
                label: 'ผู้บริหารสถานศึกษาชาวต่างชาติ',
                path: '/renew-license/foreign',
                params: { type: 2 },
              },
            ],
          },
          {
            label: 'ผู้บริหารการศึกษา',
            path: '/renew-license/education-manager',
          },
          {
            label: 'ศึกษานิเทศก์',
            path: '/renew-license/study-supervision',
          },
        ],
      },
      {
        label: 'ขอเปลี่ยนแปลง/แก้ไขหนังสืออนุญาตประกอบวิชาชีพ',
        path: '/license/edit',
      },
      {
        label: 'ขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ',
        path: '/substitute-license/request',
      },
      {
        label: 'ขอหนังสือรับรองความรู้',
        path: '/transfer-knowledge/request',
      },
      {
        label: 'ขอยื่นเทียบเคียงความรู้',
        path: '/compare-knowledge/request',
      },
      {
        label: 'ขอคืนเงินค่าธรรมเนียม',
        path: '/refund-fee/request',
      },
      {
        label: 'ขอรับรางวัลการยกย่องเชิดชูเกียรติ',
        path: '/reward/request',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/card.svg',
    label: 'หนังสืออนุญาตประกอบวิชาชีพ',
    path: '/license/*',
  },
  {
    icon: 'assets/images/icon-sidenav/event.svg',
    label: 'กิจกรรมการพัฒนาตัวเอง',
    path: '/self-improvement/request',
  },
  {
    icon: 'assets/images/icon-sidenav/reward.svg',
    label: 'รางวัลของฉัน',
    path: '/reward/list',
  },
  {
    icon: 'assets/images/icon-sidenav/people.svg',
    label: 'ข้อมูลของฉัน',
    path: '',
    subMenuName: 'myInfo',
    subMenu: [
      {
        label: 'ข้อมูลส่วนตัว',
        path: '/my-info/person-info',
      },
      {
        label: 'ที่อยู่',
        path: '/my-info/address-info',
      },
      {
        label: 'สถานที่ทำงาน',
        path: '/my-info/workplace-info',
      },
      {
        label: 'ข้อมูลการศึกษา',
        path: '/my-info/education-info',
      },
      {
        label: 'ข้อมูลประสบการณ์วิชาชีพ',
        path: '/my-info/profession-experience',
      },
      {
        label: 'ข้อมูลผลการประเมินสมรรถนะ',
        path: '/my-info/performance-result',
      },
    ],
  },
  {
    icon: 'assets/images/icon-sidenav/paper.svg',
    label: 'ประวัติการชำระเงิน',
    path: '/my-info/payment-history',
  },
  /* {
    icon: 'assets/images/icon-sidenav/gear-fill.svg',
    label: 'ออกจากระบบ',
    path: '',
  }, */
];
