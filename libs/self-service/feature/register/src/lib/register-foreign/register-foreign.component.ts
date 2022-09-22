import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  //  selector: 'ksp-register-foreign',
  templateUrl: './register-foreign.component.html',
  styleUrls: ['./register-foreign.component.scss'],
})
export class RegisterForeignComponent {
  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/register', 'en-step-1']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
