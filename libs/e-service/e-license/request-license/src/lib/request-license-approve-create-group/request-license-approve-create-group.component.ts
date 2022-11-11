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
import { KspRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface CheckKSPRequest extends KspRequest {
  check: boolean;
}

@UntilDestroy()
@Component({
  selector: 'ksp-request-license-approve-create-group',
  templateUrl: './request-license-approve-create-group.component.html',
  styleUrls: ['./request-license-approve-create-group.component.scss'],
})
export class RequestLicenseApproveCreateGroupComponent
  implements OnInit, AfterViewInit
{
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
  licenseData: any;
  listNo!: number;
  countRow = 0;

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

    this.requestService.getLevel2LicenseList().subscribe((res) => {
      this.countRow = res.countrow;
      this.dataSource.data = res.datareturn.map((item) => ({
        ...item,
        check: false,
      }));
      // console.log(res);
    });

    this.licenseData = [
      {
        order: 1,
        licenseType: 'ครู',
        count: 0,
      },
      {
        order: 2,
        licenseType: 'ครูชาวต่างชาติ',
        count: 0,
      },
      {
        order: 3,
        licenseType: 'ผู้บริหารสถานศึกษา',
        count: 0,
      },
      {
        order: 4,
        licenseType: 'ผู้บริหารการศึกษา',
        count: 0,
      },
      {
        order: 5,
        licenseType: 'ศึกษานิเทศก์',
        count: 0,
      },
    ];
  }

  onCheck(element: CheckKSPRequest) {
    element.check = !element.check;
    this.licenseData = this.licenseData.map((item: any) => {
      if (
        item.licenseType === 'ผู้บริหารสถานศึกษา' &&
        element.careertype === '2'
      ) {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (
        item.licenseType === 'ผู้บริหารการศึกษา' &&
        element.careertype === '3'
      ) {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (
        item.licenseType === 'ศึกษานิเทศก์' &&
        element.careertype === '4'
      ) {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (
        item.licenseType === 'ครูชาวต่างชาติ' &&
        element.careertype === '1' &&
        element.isforeign === '1'
      ) {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      } else if (item.licenseType === 'ครู' && element.careertype === '1') {
        if (element.check) {
          item.count = item.count + 1;
        } else {
          item.count = item.count - 1;
        }
      }
      return item;
    });
  }

  prev() {
    this.router.navigate(['/request-license', 'search-list']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = {
          listno: this.listNo.toString(),
          forward_to_license_create: this.form.controls.createNumber.value
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
        this.router.navigate(['/request-license', 'search-list']);
      }
    });
  }
}
