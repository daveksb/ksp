import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-refund-approve',
  templateUrl: './refund-approve.component.html',
  styleUrls: ['./refund-approve.component.scss'],
})
export class RefundApproveComponent extends ERewardConfirmFormBaseComponent {
  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    private router: Router,
    dialog: MatDialog,
    eRequestService: ERequestService
  ) {
    super(fb, route, dialog, eRequestService);
  }

  prevPage() {
    this.router.navigate(['/', 'refund', 'detail', this.requestId]);
  }

  navigateBack() {
    this.router.navigate(['/', 'refund', 'list']);
  }
}
