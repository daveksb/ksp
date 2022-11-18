import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-edit-license-approve-confirm',
  templateUrl: './edit-license-approve-confirm.component.html',
  styleUrls: ['./edit-license-approve-confirm.component.scss'],
})
export class EditLicenseApproveConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/edit-license', 'list']);
  }

  prevPage() {
    this.router.navigate(['/edit-license', 'detail', this.requestId]);
  }
}
