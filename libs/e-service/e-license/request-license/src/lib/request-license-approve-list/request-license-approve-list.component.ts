import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelfRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-list',
  templateUrl: './request-license-approve-list.component.html',
  styleUrls: ['./request-license-approve-list.component.scss'],
})
export class RequestLicenseApproveListComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SelfRequest>();

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  search() {
    const payload = {
      systemtype: '1',
      requesttype: '1',
    };
    this.requestService.searchRequest(payload).subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/request-license', 'approve-detail', id]);
  }

  clear() {
    this.dataSource.data = [];
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
  //  'print',
];
