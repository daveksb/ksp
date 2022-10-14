import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-book-receive-detail-info',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  templateUrl: './book-receive-detail-info.component.html',
  styleUrls: ['./book-receive-detail-info.component.scss'],
})
export class BookReceiveDetailInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
