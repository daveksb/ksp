import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-uni-service-login',
  templateUrl: './uni-service-login.component.html',
  styleUrls: ['./uni-service-login.component.css'],
})
export class UniServiceLoginComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/', 'license', 'home']);
  }

  register() {
    this.router.navigate(['/', 'register']);
  }
}
