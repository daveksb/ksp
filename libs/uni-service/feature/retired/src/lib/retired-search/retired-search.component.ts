import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-retired-search',
  templateUrl: './retired-search.component.html',
  styleUrls: ['./retired-search.component.scss'],
})
export class RetiredSearchComponent {
  constructor(private router: Router) {}

  confirm() {
    this.router.navigate(['/', 'retired', 'reason']);
  }
}
