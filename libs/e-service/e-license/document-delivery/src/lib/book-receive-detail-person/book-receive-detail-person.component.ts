import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReceiveDetailInfoComponent } from '../book-receive-detail-info/book-receive-detail-info.component';

@Component({
  selector: 'ksp-book-receive-detail-person',
  standalone: true,
  imports: [CommonModule, BookReceiveDetailInfoComponent],
  templateUrl: './book-receive-detail-person.component.html',
  styleUrls: ['./book-receive-detail-person.component.scss'],
})
export class BookReceiveDetailPersonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
