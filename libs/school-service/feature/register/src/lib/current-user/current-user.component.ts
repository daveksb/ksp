import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  form = this.fb.group({
    selectUniversity: [],
  });

  constructor(public router: Router, private fb: FormBuilder) {}

  next() {
    this.router.navigate(['/register', 'requester-info']);
  }

  back() {
    this.router.navigate(['/login']);
  }
}
