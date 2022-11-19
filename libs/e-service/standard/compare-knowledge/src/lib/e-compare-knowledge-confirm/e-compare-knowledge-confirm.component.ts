import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardConfirmFormBaseComponent } from '@ksp/self-service/form';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-compare-knowledge-confirm',
  templateUrl: './e-compare-knowledge-confirm.component.html',
  styleUrls: ['./e-compare-knowledge-confirm.component.scss'],
})
export class ECompareKnowledgeConfirmComponent extends ERewardConfirmFormBaseComponent {
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
    this.router.navigate(['/compare-knowledge', 'list']);
  }

  prevPage() {
    this.router.navigate(['/compare-knowledge', 'detail', this.requestId]);
  }
}
