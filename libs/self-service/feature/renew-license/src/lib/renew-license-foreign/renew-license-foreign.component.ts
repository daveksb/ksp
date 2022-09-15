import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-renew-license-foreign',
  templateUrl: './renew-license-foreign.component.html',
  styleUrls: ['./renew-license-foreign.component.scss'],
})
export class RenewLicenseForeignComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/', 'home']);
  }

  save() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `Do you want to save and proceed?`,
        btnLabel: 'Save & Proceed',
        cancelBtnLabel: ' Save (Draft)',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/license', 'payment-channel']);
      }
    });
  }
}
