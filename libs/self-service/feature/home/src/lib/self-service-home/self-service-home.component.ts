import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-self-service-home',
  templateUrl: './self-service-home.component.html',
  styleUrls: ['./self-service-home.component.css'],
})
export class SelfServiceHomeComponent {
  constructor(private router: Router) {}

  thaiLogin() {
    this.router.navigate(['/', 'login']);
    // test
  }
}
