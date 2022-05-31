import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-login',
  templateUrl: './school-service-login.component.html',
  styleUrls: ['./school-service-login.component.css'],
})
export class SchoolServiceLoginComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/', 'temp-license', 'list']);
  }

  register() {
    this.router.navigate(['/', 'register', 'current-user']);
  }

  forget() {
    this.router.navigate(['/', 'forget-password', 'confirm-password']);
  }
}
