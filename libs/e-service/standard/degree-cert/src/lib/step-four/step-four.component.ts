import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  title: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert']);
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-5']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-3']);
  }
}
