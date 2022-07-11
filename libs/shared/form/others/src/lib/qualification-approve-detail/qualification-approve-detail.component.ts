import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ksp-qualification-approve-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './qualification-approve-detail.component.html',
  styleUrls: ['./qualification-approve-detail.component.scss'],
})
export class QualificationApproveDetailComponent implements OnInit {
  constructor() {}

  @Output() confirmed = new EventEmitter<boolean>();

  ngOnInit(): void {}
}
