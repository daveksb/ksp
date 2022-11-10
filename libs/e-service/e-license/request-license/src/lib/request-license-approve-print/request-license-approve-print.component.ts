import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERequestService } from '@ksp/shared/service';
import { getCookie, parseJson } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-request-license-approve-print',
  templateUrl: './request-license-approve-print.component.html',
  styleUrls: ['./request-license-approve-print.component.scss'],
})
export class RequestLicenseApprovePrintComponent implements OnInit {
  groupNo!: number;
  accounts!: string;

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.requestService.getLastApproveGroup().subscribe((res) => {
      this.groupNo = +res.groupno + 1;
      console.log('group = ', parseJson(res.grouplist));
    });

    this.route.queryParamMap.subscribe((params) => {
      const accounts = params.get('accounts') || '';

      if (accounts) {
        this.accounts = accounts.split(',').join(' | ');
      }
    });
  }

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }

  save() {
    const payload = {
      userid: `${getCookie('userId')}`,
      groupno: this.groupNo.toString(),
      grouplist: JSON.stringify(this.accounts.split(' | ')),
    };
    this.requestService.createAprroveGroup(payload).subscribe((res) => {
      if (res?.returnmessage === 'success') {
        this.router.navigate(['/request-license', 'search-list']);
      }
    });
  }
}
