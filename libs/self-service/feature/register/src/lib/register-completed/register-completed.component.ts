import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCompletedComponent {
  constructor(private router: Router) {}

  loginPage() {
    this.router.navigate(['/', 'login']);
  }
}
