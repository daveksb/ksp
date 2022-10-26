import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-thai-teacher-confirm',
  templateUrl: './e-thai-teacher-confirm.component.html',
  styleUrls: ['./e-thai-teacher-confirm.component.scss'],
})
export class EThaiTeacherConfirmComponent
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
    this.router.navigate(['/thai-teacher', 'list']);
  }

  prevPage() {
    this.router.navigate(['/thai-teacher', 'detail', this.requestId]);
  }
}
