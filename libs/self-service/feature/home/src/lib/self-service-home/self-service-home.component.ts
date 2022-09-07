import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './self-service-home.component.html',
  styleUrls: ['./self-service-home.component.css'],
})
export class SelfServiceHomeComponent {
  constructor(private router: Router) {}

  register(requestType: number) {
    this.router.navigate(['/', 'register', 'policy'], {
      queryParams: { type: requestType },
    });
  }

  /* login() {
    this.router.navigate(['/', 'register', 'policy']);
  } */
}
