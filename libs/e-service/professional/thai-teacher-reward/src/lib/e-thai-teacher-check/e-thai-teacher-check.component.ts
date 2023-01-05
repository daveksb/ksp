import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-thai-teacher-check',
  templateUrl: './e-thai-teacher-check.component.html',
  styleUrls: ['./e-thai-teacher-check.component.scss'],
})
export class EThaiTeacherCheckComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/thai-teacher', 'check-list']);
  }

  prevPage() {
    this.router.navigate(['/thai-teacher', 'check', this.requestId]);
  }
}
