import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent {
  degreeType = 0;
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['/', 'degree-cert', 'step-2'], {
      queryParams: { type: this.degreeType },
    });
  }

  degreeChanged(degreeType: number) {
    // it has 8 degree types and target with 2 form types
    degreeType > 3 ? (this.degreeType = 2) : (this.degreeType = 1);
  }
}
