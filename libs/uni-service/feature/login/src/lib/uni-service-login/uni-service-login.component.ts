import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordPersonIdComponent } from 'libs/uni-service/ui/dialog/src';

@Component({
  selector: 'ksp-uni-service-login',
  templateUrl: './uni-service-login.component.html',
  styleUrls: ['./uni-service-login.component.css'],
})
export class UniServiceLoginComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  home() {
    this.router.navigate(['/', 'request', 'home']);
  }

  register() {
    this.router.navigate(['/', 'register']);
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordPersonIdComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
