import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-search-list',
  templateUrl: './request-license-approve-search-list.component.html',
  styleUrls: ['./request-license-approve-search-list.component.scss'],
})
export class RequestLicenseApproveSearchListComponent
  implements OnInit, AfterViewInit
{
  displayedColumns = [
    'select',
    'resolution',
    'resolution2',
    'group',
    'account',
    'count',
    'licenseType',
    'licenseGroup',
    'process',
    'status',
    'screenDate',
    'guaranteeDate',
  ];
  dataSource = new MatTableDataSource<any>();
  mode: 'create' | 'guarantee' = 'create';
  canPrint = false;
  canSave = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url[0].path === 'guarantee') {
        this.mode = 'guarantee';
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelect(element: any) {
    element.select = !element.select;

    const selectedData = this.dataSource.data.filter((item) => item.select);

    if (selectedData.length > 0) {
      this.canPrint = selectedData.every((item) => !item.groupno);

      const groupNo = selectedData[0].groupno;
      if (groupNo) {
        this.canSave = selectedData.every((item) => item.groupno === groupNo);
      } else {
        this.canSave = false;
      }
    } else {
      this.canSave = false;
      this.canPrint = false;
    }
  }

  searchData(params: any) {
    this.canPrint = false;
    this.canSave = false;
    const payload = {
      groupno: params.groupno,
      process: params.process,
      status: params.status,
      createdate: params.createdate,
      offset: '0',
      row: '100',
    };
    this.requestService.searchRequestList(payload).subscribe((res) => {
      this.dataSource.data = res; /* [
        {
          select: true,
          resolution: '01/2564',
          resolution2: '01/2564',
          group: '1',
          account: '7020',
          count: 100,
          licenseType: 'ครู',
          licenseGroup: 'ชาวไทย',
          process: 'จัดทำกลุ่มบัญชีรายชื่อ',
          status: 'ระหว่างดำเนินการ',
          screenDate: '01 มิ.ย. 2564',
          guaranteeDate: '01 มิ.ย. 2564',
        },
      ]; */
    });
  }

  editGroup() {
    this.router.navigate(['/request-license', 'create-group-list']);
  }

  createGroup() {
    this.router.navigate(['/request-license', 'create-group']);
  }

  kmv() {
    this.router.navigate(['/request-license', 'kmv']);
  }

  guarantee() {
    this.router.navigate(['/request-license', 'guarantee-confirm']);
  }

  print() {
    const selectedAccount = this.dataSource.data
      .filter((item) => item.select)
      .map((item) => item.listno)
      .join(',');
    this.router.navigate(['/request-license', 'print'], {
      queryParams: { accounts: selectedAccount },
    });
  }

  saveResult() {
    const selectedData = this.dataSource.data.filter((item) => item.select);
    const account = selectedData[0].listno;
    this.router.navigate(['/request-license', 'save-result'], {
      queryParams: { account },
    });
  }
}
