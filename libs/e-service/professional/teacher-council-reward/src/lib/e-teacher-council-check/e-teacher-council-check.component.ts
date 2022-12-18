import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-teacher-council-check',
  templateUrl: './e-teacher-council-check.component.html',
  styleUrls: ['./e-teacher-council-check.component.scss'],
})
export class ETeacherCouncilCheckComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/teacher-council', 'check-list']);
  }

  prevPage() {
    this.router.navigate(['/teacher-council', 'check', this.requestId]);
  }
}
