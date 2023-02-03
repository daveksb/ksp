import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-research-reward-confirm',
  templateUrl: './e-research-reward-confirm.component.html',
  styleUrls: ['./e-research-reward-confirm.component.scss'],
})
export class EResearchRewardConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/research-reward', 'list']);
  }

  prevPage() {
    this.router.navigate(['/research-reward', 'detail', this.requestId]);
  }
}
