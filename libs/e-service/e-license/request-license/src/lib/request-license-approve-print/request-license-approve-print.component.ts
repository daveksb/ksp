import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-print',
  templateUrl: './request-license-approve-print.component.html',
  styleUrls: ['./request-license-approve-print.component.scss'],
})
export class RequestLicenseApprovePrintComponent implements OnInit {
  groupNo!: number;

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.requestService.getLastApproveGroup().subscribe((res) => {
      this.groupNo = +res.groupno + 1;
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }
}
