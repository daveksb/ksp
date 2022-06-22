import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './self-service-home.component.html',
  styleUrls: ['./self-service-home.component.css'],
})
export class SelfServiceHomeComponent {
  constructor(private router: Router) {}

  thaiLogin() {
    this.router.navigate(['/', 'login']);
  }
}
