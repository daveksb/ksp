import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SelfApproveListProcesses } from '@ksp/shared/constant';
import { ERequestService } from '@ksp/shared/service';

export function getProcess(processId: string) {
  return SelfApproveListProcesses.find((s) => s.processId === processId);
}

export function getStatusLabel(process: string, status: string) {
  return getProcess(process)?.status.find((s) => s.id === +status)?.ename;
}

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
  getProcess = getProcess;
  getStatusLabel = getStatusLabel;

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
    this.requestService.searchSelfApproveList(payload).subscribe((res) => {
      this.dataSource.data = res.map((i) => {
        return { ...i, count: JSON.parse(i.requestlist || '').length };
      });
    });
  }

  editGroup() {
    this.router.navigate(['/request-license', 'create-group-list']);
  }

  createGroup() {
    this.router.navigate(['/request-license', 'create-group']);
  }

  kmv() {
    const selectedData = this.dataSource.data.filter((item) => item.select);
    const group = selectedData[0].groupno;
    this.router.navigate(['/request-license', 'kmv'], {
      queryParams: { group },
    });
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
