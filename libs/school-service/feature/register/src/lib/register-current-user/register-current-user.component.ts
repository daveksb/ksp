import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-current-user.component.html',
  styleUrls: ['./register-current-user.component.scss'],
})
export class RegisterCurrentUserComponent {
  /*   form = this.fb.group({
    selectUniversity: [],
  });
 */

  selectedUniversity = '';

  constructor(public router: Router, private fb: FormBuilder) {}

  next() {
    this.router.navigate(['/register', 'requester']);
  }

  back() {
    this.router.navigate(['/login']);
  }
}
