import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-qualification-approve-list',
  templateUrl: './qualification-approve-list.component.html',
  styleUrls: ['./qualification-approve-list.component.scss'],
})
export class QualificationApproveListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  next() {
    this.router.navigate(['/qualification', 'detail']);
  }
}
