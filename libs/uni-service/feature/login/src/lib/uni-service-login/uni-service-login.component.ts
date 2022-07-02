import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordPersonIdComponent } from '@ksp/uni-service/dialog';

@Component({
  selector: 'uni-service-login',
  templateUrl: './uni-service-login.component.html',
  styleUrls: ['./uni-service-login.component.scss'],
})
export class UniServiceLoginComponent {
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
    this.dialog.open(ForgotPasswordPersonIdComponent, {
      width: '350px',
    });
  }
}
