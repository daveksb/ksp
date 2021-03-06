import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent {
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['/', 'register']);
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }
}
