import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';

import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-praise-teacher-confirm',
  templateUrl: './e-praise-teacher-confirm.component.html',
  styleUrls: ['./e-praise-teacher-confirm.component.scss'],
})
export class EPraiseTeacherConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/praise-teacher', 'list']);
  }

  prevPage() {
    this.router.navigate(['/praise-teacher', 'detail', this.requestId]);
  }
}
