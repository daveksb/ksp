import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-book-receive-detail',
  templateUrl: './book-receive-detail.component.html',
  styleUrls: ['./book-receive-detail.component.scss'],
})
export class BookReceiveDetailComponent implements OnInit {
  form = this.fb.group({
    docInfo: [],
  });

  docType: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      this.docType = Number(res['docInfo']);
    });
  }
}
