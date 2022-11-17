import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-renew-license-confirm',
  templateUrl: './renew-license-confirm.component.html',
  styleUrls: ['./renew-license-confirm.component.scss'],
})
export class RenewLicenseConfirmComponent extends ERewardConfirmFormBaseComponent {
  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    private router: Router,
    dialog: MatDialog,
    eRequestService: ERequestService
  ) {
    super(fb, route, dialog, eRequestService);
  }

  navigateBack() {
    this.router.navigate(['/renew-license', 'approve-list']);
  }

  prevPage() {
    this.router.navigate(['/renew-license', 'approve-detail', this.requestId]);
  }
}
