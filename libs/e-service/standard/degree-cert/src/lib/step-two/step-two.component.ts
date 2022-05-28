import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  title: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
  }

  cancel() {
    this.router.navigate(['./', 'degree-cert', 'list', '1']);
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-3']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-1']);
  }

  tabChanged(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        //this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
        break;
      case 1:
        //this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
        break;
      case 2:
        //this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
        break;
      case 3:
        //this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
        break;
      default:
    }
  }
}
