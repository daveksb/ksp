import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-student-list-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list-subject.component.html',
  styleUrls: ['./student-list-subject.component.scss'],
})
export class StudentListSubjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
