import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-knowledge-cert-confirm',
  templateUrl: './e-knowledge-cert-confirm.component.html',
  styleUrls: ['./e-knowledge-cert-confirm.component.scss'],
})
export class EKnowledgeCertConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/knowledge-cert', 'list']);
  }

  prevPage() {
    this.router.navigate(['/knowledge-cert', 'detail', this.requestId]);
  }
}
