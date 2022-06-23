import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';

@Component({
  selector: 'self-service-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: ['./register-step-three.component.scss'],
})
export class RegisterStepThreeComponent {
  form = this.fb.group({
    password: [],
    confirmPassword: [],
  });


  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder) {}

  openDialog() {
    this.dialog.open(RegisterCompletedComponent, {
      width: '600px',
    });
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }
}
