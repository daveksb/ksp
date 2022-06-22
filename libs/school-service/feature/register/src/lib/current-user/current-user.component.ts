import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  constructor(public router: Router) {}

  next() {
    this.router.navigate(['/', 'register', 'requester-info']);
  }

  back() {
    this.router.navigate(['/', 'login']);
  }
}
