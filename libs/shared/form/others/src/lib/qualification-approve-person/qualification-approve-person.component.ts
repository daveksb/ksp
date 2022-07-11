import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ksp-qualification-approve-person',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './qualification-approve-person.component.html',
  styleUrls: ['./qualification-approve-person.component.scss'],
})
export class QualificationApprovePersonComponent implements OnInit {
  constructor() {}

  @Output() completed = new EventEmitter<boolean>();

  ngOnInit(): void {}
}
