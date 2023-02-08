import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  KspRequest,
  SelfApprovelicenseData,
  SelfApproveList,
} from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface CheckKSPRequest extends KspRequest {
  check: boolean;
}

@UntilDestroy()
@Component({
  selector: 'ksp-renew-license-create-group',
  templateUrl: './renew-license-create-group.component.html',
  styleUrls: ['./renew-license-create-group.component.scss'],
})
export class RenewLicenseCreateGroupComponent implements OnInit, AfterViewInit {
  SelfServiceRequestSubType = SelfServiceRequestSubType;
  displayedColumns = [
    'check',
    'order',
    'urgent',
    'licenseNo',
    'licenseType',
    'licenseGroup',
    'idCardNo',
    'name',
    'approveDate',
    'requestDate',
  ];
  dataSource = new MatTableDataSource<CheckKSPRequest>();
  licenseData = LicenseData;
  listNo!: number;
  selection = new SelectionModel<any>(true, []);
  maxCareerType!: SelfApprovelicenseData; // วิชาชีพของคนกลุ่มใหญ่ในบัญชีนี้

  form = this.fb.group({
    createNumber: [false],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private requestService: ERequestService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.requestService.getLastApproveList().subscribe((res) => {
      this.listNo = +res.listno + 1;
    });

    const payload = {
      offset: 0,
      row: 500,
      requesttype: '2',
    };

    this.requestService.getLevel2LicenseList(payload).subscribe((res) => {
      //console.log('res level 2 = ', res);
      this.dataSource.data = res.datareturn.map((item) => ({
        ...item,
        check: false,
      }));
    });
  }

  onCheck(element: CheckKSPRequest) {
    element.check = !element.check;
    this.licenseData = this.licenseData.map((item: any) => {
      if (item.licenseType === '2' && element.careertype === '2') {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (item.licenseType === '3' && element.careertype === '3') {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (item.licenseType === '4' && element.careertype === '4') {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (
        item.licenseType === '5' &&
        element.careertype === '5' &&
        element.isforeign === '1'
      ) {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (item.licenseType === '1' && element.careertype === '1') {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      }
      return item;
    });

    this.maxCareerType = this.licenseData.reduce((acc, cur) => {
      if (acc.count > cur.count) {
        return acc;
      } else {
        return cur;
      }
    });
  }

  prev() {
    this.router.navigate(['/renew-license', 'search-list']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      //console.log('max career type = ', this.maxCareerType);
      if (res) {
        const payload: Partial<SelfApproveList> = {
          listno: this.listNo.toString(),
          process: '5',
          careertype: this.maxCareerType.licenseType,
          requesttype: '2', // ใบคำขอต่ออายุ
          isforeign: '0',
          status: '1',
          forwardtolicensecreate: this.form.controls.createNumber.value
            ? '1'
            : '0',
          requestlist: JSON.stringify(
            this.dataSource.data
              .filter((item) => item.check)
              .map((item) => item.id)
          ),
          userid: `${getCookie('userId')}`,
        };
        this.requestService.createAprroveList(payload).subscribe((res) => {
          if (res?.returnmessage === 'success') {
            this.completeDialog();
          }
        });
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/renew-license', 'search-list']);
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.map((d) => this.onCheck(d));
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.dataSource.data.map((d) => this.onCheck(d));
  }
}

export const LicenseData: SelfApprovelicenseData[] = [
  {
    order: 1,
    licenseType: '1',
    label: 'ครู',
    count: 0,
  },
  {
    order: 2,
    licenseType: '5',
    label: 'ครูชาวต่างชาติ',
    count: 0,
  },
  {
    order: 3,
    licenseType: '2',
    label: 'ผู้บริหารสถานศึกษา',
    count: 0,
  },
  {
    order: 4,
    licenseType: '3',
    label: 'ผู้บริหารการศึกษา',
    count: 0,
  },
  {
    order: 5,
    licenseType: '4',
    label: 'ศึกษานิเทศก์',
    count: 0,
  },
];
