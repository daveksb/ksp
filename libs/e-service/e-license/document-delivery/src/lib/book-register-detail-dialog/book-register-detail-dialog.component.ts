import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReceiveDetailInfoComponent } from '../book-receive-detail-info/book-receive-detail-info.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ksp-book-register-detail-dialog',
  standalone: true,
  imports: [CommonModule, BookReceiveDetailInfoComponent, MatDialogModule],
  templateUrl: './book-register-detail-dialog.component.html',
  styleUrls: ['./book-register-detail-dialog.component.scss'],
})
export class BookRegisterDetailDialogComponent implements OnInit {
  //bookType: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      bookType: string;
    }
  ) {}

  ngOnInit(): void {}
}
