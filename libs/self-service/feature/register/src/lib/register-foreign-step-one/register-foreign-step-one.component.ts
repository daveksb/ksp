import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-register-foreign-step-one',
  templateUrl: './register-foreign-step-one.component.html',
  styleUrls: ['./register-foreign-step-one.component.scss'],
})
export class RegisterForeignStepOneComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  next() {
    this.router.navigate(['/', 'register', 'en-step-2']);
  }
}
