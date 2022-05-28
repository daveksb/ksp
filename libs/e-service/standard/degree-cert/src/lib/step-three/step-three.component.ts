import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit{
  title: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '1']);
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-4']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-2']);
  }
}
