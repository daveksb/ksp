import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ksp-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      //this.pageType = Number(res['type']);
      console.log('res = ', res);
    });
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-3']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-1']);
  }

}
