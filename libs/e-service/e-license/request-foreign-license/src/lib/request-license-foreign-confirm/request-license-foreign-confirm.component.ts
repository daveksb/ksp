import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-request-license-foreign-confirm',
  templateUrl: './request-license-foreign-confirm.component.html',
  styleUrls: ['./request-license-foreign-confirm.component.scss'],
})
export class RequestLicenseForeignConfirmComponent
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
    this.router.navigate(['/request-foreign-license', 'list']);
  }

  prevPage() {
    this.router.navigate([
      '/request-foreign-license',
      'detail',
      this.requestId,
    ]);
  }
}
