import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-senior-teacher-confirm',
  templateUrl: './e-senior-teacher-confirm.component.html',
  styleUrls: ['./e-senior-teacher-confirm.component.scss'],
})
export class ESeniorTeacherConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/senior-teacher', 'list']);
  }

  prevPage() {
    this.router.navigate(['/senior-teacher', 'detail', this.requestId]);
  }
}
