import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  constructor(private router: Router) {}

  search() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }
}
