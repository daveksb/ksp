import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  constructor(public router: Router) {}

  next() {
      this.router.navigate(['/', 'register', 'register']);
  }
}
