import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-best-teacher-confirm',
  templateUrl: './e-best-teacher-confirm.component.html',
  styleUrls: ['./e-best-teacher-confirm.component.scss'],
})
export class EBestTeacherConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/best-teacher', 'list']);
  }

  prevPage() {
    this.router.navigate(['/best-teacher', 'detail', this.requestId]);
  }
}
