import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordSearchPersonComponent } from '@ksp/shared/dialog';
import { LoginFormComponent } from '@ksp/shared/form/login';

@Component({
  selector: 'uni-service-login',
  templateUrl: './uni-login.component.html',
  styleUrls: ['./uni-login.component.scss'],
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
})
export class UniLoginComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  login() {
    this.router.navigate(['/home']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  retired() {
    this.router.navigate(['/retired']);
  }

  forgetPassword() {
    this.dialog.open(ForgotPasswordSearchPersonComponent, {
      width: '350px',
    });
  }
}
