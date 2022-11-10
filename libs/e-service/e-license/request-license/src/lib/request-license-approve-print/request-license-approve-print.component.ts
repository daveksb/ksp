import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERequestService } from '@ksp/shared/service';
import { getCookie, parseJson } from '@ksp/shared/utility';

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
      console.log('group = ', parseJson(res.grouplist));
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }

  save() {
    const payload = {
      userid: `${getCookie('userId')}`,
      groupno: this.groupNo.toString(),
      grouplist: "{'field1':'data1','field2':'data2','field3':'data3'}",
    };
    this.requestService.createAprroveGroup(payload).subscribe((res) => {
      if (res?.returnmessage === 'success') {
        this.router.navigate(['/request-license', 'search-list']);
      }
    });
  }
}
