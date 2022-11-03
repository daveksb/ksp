import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-approve-confirm',
  templateUrl: './request-license-approve-confirm.component.html',
  styleUrls: ['./request-license-approve-confirm.component.scss'],
})
export class RequestLicenseApproveConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/request-license', 'approve-list']);
  }

  prevPage() {
    this.router.navigate([
      '/request-license',
      'approve-detail',
      this.requestId,
    ]);
  }
}
