import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './self-service-thai-login.component.html',
  styleUrls: ['./self-service-thai-login.component.css'],
})
export class SelfServiceThaiLoginComponent {
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['/', 'register', 'policy']);
  }

  login() {
    this.router.navigate(['/', 'license', 'request']);
  }
}
