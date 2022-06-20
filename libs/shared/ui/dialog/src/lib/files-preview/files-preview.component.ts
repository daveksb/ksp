import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ksp-files-preview',
  templateUrl: './files-preview.component.html',
  styleUrls: ['./files-preview.component.scss'],
})
export class FilesPreviewComponent implements OnInit {
  fileVerify = ['รับเอกสารแล้ว', 'ขอเอกสารเพิ่มเติม'];

  constructor() {}

  @Output() confirmed = new EventEmitter<boolean>();
  confirm() {
    this.confirmed.emit(true);
  }

  ngOnInit(): void {}
}
