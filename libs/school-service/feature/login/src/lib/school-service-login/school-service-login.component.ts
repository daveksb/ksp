import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-school-service-login',
  templateUrl: './school-service-login.component.html',
  styleUrls: ['./school-service-login.component.css'],
})
export class SchoolServiceLoginComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/', 'request', 'home']);
  }

  register() {
    this.router.navigate(['/', 'register']);
  }
}
