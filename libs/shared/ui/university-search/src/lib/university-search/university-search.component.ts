import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ksp-university-search',
  templateUrl: './university-search.component.html',
  styleUrls: ['./university-search.component.css'],
})
export class UniversitySearchComponent {
  constructor(private location: Location) {}

  back(): void {
    this.location.back();
  }
}
