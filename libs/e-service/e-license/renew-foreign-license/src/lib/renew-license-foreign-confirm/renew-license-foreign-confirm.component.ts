import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-renew-license-foreign-confirm',
  templateUrl: './renew-license-foreign-confirm.component.html',
  styleUrls: ['./renew-license-foreign-confirm.component.scss'],
})
export class RenewLicenseForeignConfirmComponent
  extends ERewardConfirmFormBaseComponent
  implements OnInit
{
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
    this.router.navigate(['/renew-foreign-license', 'list']);
  }

  prevPage() {
    this.router.navigate(['/renew-foreign-license', 'detail', this.requestId]);
  }
}
