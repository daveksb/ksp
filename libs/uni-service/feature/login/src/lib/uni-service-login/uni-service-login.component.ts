import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordPersonIdComponent } from '@ksp/uni-service/ui/dialog';

@Component({
  selector: 'uni-service-login',
  templateUrl: './uni-service-login.component.html',
  styleUrls: ['./uni-service-login.component.css'],
})
export class UniServiceLoginComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  home() {
    this.router.navigate(['/', 'home']);
  }

  register() {
    this.router.navigate(['/', 'register']);
  }

  retired() {
    this.router.navigate(['/', 'retired']);
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordPersonIdComponent, {
      height: '350px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
