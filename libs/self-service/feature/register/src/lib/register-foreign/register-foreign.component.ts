import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  //  selector: 'ksp-register-foreign',
  templateUrl: './register-foreign.component.html',
  styleUrls: ['./register-foreign.component.scss'],
})
export class RegisterForeignComponent {
  form = this.fb.group({
    teachercouncilidno: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  submit() {
    this.router.navigate(['/register', 'en-step-1']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
