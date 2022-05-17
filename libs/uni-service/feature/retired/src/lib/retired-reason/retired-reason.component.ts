import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-retired-reason',
  templateUrl: './retired-reason.component.html',
  styleUrls: ['./retired-reason.component.scss'],
})
export class RetiredReasonComponent {
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['/', 'retired', 'attachment']);
  }
}
