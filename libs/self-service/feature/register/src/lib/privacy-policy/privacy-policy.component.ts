import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit {
  pageType = 0;
  constructor(private router: Router, private route: ActivatedRoute) {}

  register() {
    this.router.navigate(['/', 'register', 'th-step-1']);
  }

  register2() {
    this.router.navigate(['/', 'register', 'en-step-0']);
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    });
  }
}
