import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  title: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '1']);
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-2']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'list']);
  }
}
