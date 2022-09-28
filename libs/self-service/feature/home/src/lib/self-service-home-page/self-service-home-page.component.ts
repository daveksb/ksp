import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SelfServiceRequestSubType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import { SelfRequestService } from '@ksp/shared/service';
import { getCookie, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-self-service-home-page',
  templateUrl: './self-service-home-page.component.html',
  styleUrls: ['./self-service-home-page.component.scss'],
})
export class SelfServiceHomePageComponent {
  badgeTitle = [
    `เลขที่ใบคำขอ : SF_010641000123 รายการขอขึ้นทะเบียนใบอนุญาต ถูกส่งคืน
  “ปรับแก้ไข / เพิ่มเติม” กดเพื่อตรวจสอบ`,
  ];

  dataSource = new MatTableDataSource<SelfRequest>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private requestService: SelfRequestService
  ) {}

  displayedColumns: string[] = column;

  search() {
    const payload = {
      staffid: getCookie('userId'),
      requesttype: null,
      requestno: null,
      requestdate: null,
      requeststatus: null,
      currentprocess: null,
      offset: '0',
      row: '100',
    };
    this.requestService.searchMyRequests(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;

        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.dataSource.data = [];
      }
    });
  }

  toThaiDate(input: string) {
    return thaiDate(new Date(input));
  }

  goToDetail(input: SelfRequest) {
    console.log('self request = ', input);
    const requestType = Number(input.requesttype);
    const subType = Number(input.subtype);
    const isForeign = Number(input.requestfor);
    const id = Number(input.id);
    console.log('subType ', subType);

    if (requestType > 40) {
      this.reward();
    } else if (requestType === 30) {
      this.refundFee();
    } else if (requestType === 6) {
      this.compare();
    } else if (requestType === 5) {
      this.transfer();
    } else if (requestType === 4) {
      this.substituteLicense();
    } else if (requestType === 3) {
      this.licenseEdit();
    } else if (requestType === 2) {
      // renew
      this.checkRenewRedirect(subType, isForeign, id);
    } else if (requestType === 1) {
      // new

      this.checkRequestRedirect(subType, isForeign, id);
    }
  }

  checkRequestRedirect(
    subtype: SelfServiceRequestSubType,
    isForeign: SelfServiceRequestForType,
    id: number
  ) {
    switch (subtype) {
      case SelfServiceRequestSubType.ครู: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.thaiTeacher(id);
        } else {
          this.foreignTeacher(subtype, id);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารสถานศึกษา: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.schoolManager(id);
        } else {
          this.foreignTeacher(subtype);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารการศึกษา:
        this.eduManagerRequest(id);
        break;
      case SelfServiceRequestSubType.ศึกษานิเทศก์:
        this.studySupervision(id);
        break;
    }
  }

  checkRenewRedirect(
    subtype: SelfServiceRequestSubType,
    isForeign: SelfServiceRequestForType,
    id: number
  ) {
    switch (subtype) {
      case SelfServiceRequestSubType.ครู: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.teacherRenew(id);
        } else {
          this.foreignRenew(subtype);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารสถานศึกษา: {
        if (isForeign === SelfServiceRequestForType.ชาวไทย) {
          this.schManagerRenew(id);
        } else {
          this.foreignRenew(subtype);
        }
        break;
      }
      case SelfServiceRequestSubType.ผู้บริหารการศึกษา:
        this.eduManagerRenew(id);
        break;
      case SelfServiceRequestSubType.ศึกษานิเทศก์:
        this.supervisionRenew(id);
        break;
    }
  }

  clear() {
    this.dataSource.data = [];
  }

  // requestLicense(type: SelfServiceRequestSubType) {
  //   this.router.navigate(['/license', 'request', type]);
  // }

  // ครูไทย
  thaiTeacher(id?: number) {
    this.router.navigate(['/license', 'teacher', ...(id ? [`${id}`] : [])]);
  }

  //ครู + ผู้บริหหาร ต่างชาติ
  foreignTeacher(type: SelfServiceRequestSubType, id?: number) {
    if (id) {
      this.router.navigate(
        ['/license', 'foreign-teacher', ...(id ? [`${id}`] : [])],
        {
          queryParams: { type },
        }
      );
    } else {
      this.router.navigate(['/license', 'agreement'], {
        queryParams: { type },
      });
    }
  }

  // ผู้บริหารสถานศึกษา
  schoolManager(id?: number) {
    this.router.navigate([
      '/license',
      'school-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }

  // ผู้บริหารการศึกษา
  eduManagerRequest(id?: number) {
    this.router.navigate([
      '/license',
      'education-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }

  //ศึกษานิเทศก์
  studySupervision(id?: number) {
    this.router.navigate([
      '/license',
      'study-supervision',
      ...(id ? [`${id}`] : []),
    ]);
  }

  // renewLicense(type: SelfServiceRequestSubType) {
  //   this.router.navigate(['/renew-license', 'request', type]);
  // }

  // ครูไทย
  teacherRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'request',
      ...(id ? [`${id}`] : []),
    ]);
  }

  //ครู + ผู้บริหาร ต่างชาติ
  foreignRenew(type: SelfServiceRequestSubType) {
    this.router.navigate(['/renew-license', 'foreign'], {
      queryParams: { type },
    });
  }
  // ผู้บริหารสถานศึกษา
  schManagerRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'school-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }

  // ผู้บริหารการศึกษา
  eduManagerRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'education-manager',
      ...(id ? [`${id}`] : []),
    ]);
  }

  //ศึกษานิเทศก์
  supervisionRenew(id?: number) {
    this.router.navigate([
      '/renew-license',
      'study-supervision',
      ...(id ? [`${id}`] : []),
    ]);
  }

  //ขอเปลี่ยนแปลง/แก้ไขใบอนุญาตประกอบวิชาชีพ
  licenseEdit() {
    this.router.navigate(['/license', 'edit']);
  }

  //ขอรับรางวัล
  reward() {
    this.router.navigate(['/reward', 'request']);
  }

  // ขอหนังสือรับรองความรู้
  transfer() {
    this.router.navigate(['/transfer-knowledge', 'request']);
  }

  // เทียบเคียง
  compare() {
    this.router.navigate(['/compare-knowledge', 'request']);
  }

  // คืนเงินค่าธรรมเนียม
  refundFee() {
    this.router.navigate(['/refund-fee', 'request']);
  }

  //ขอใบแทนใบอนุญาตประกอบวิชาชีพ
  substituteLicense() {
    this.router.navigate(['/substitute-license', 'request']);
  }
}

export const column = [
  'order',
  'requestno',
  'requestdate',
  'name',
  'paymentStatus',
  'listStatus',
  'process',
  'edit',
  'print',
];
