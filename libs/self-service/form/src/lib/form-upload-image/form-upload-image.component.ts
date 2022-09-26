import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestPageType } from '@ksp/shared/constant';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';

@Component({
  selector: 'self-service-form-upload-image',
  templateUrl: './form-upload-image.component.html',
  styleUrls: ['./form-upload-image.component.css'],
  standalone: true,
  imports: [FileUploadComponent, CommonModule],
})
export class FormUploadImageComponent {
  @Input() isEditMode = true;
  @Input() imgSrc = '';
  @Input() requestType: any;
  @Input() uniqueTimestamp!: string;
  @Output() uploadImageComplete = new EventEmitter<any>();
  requestPageType = RequestPageType;
  uploadComplete(event: any) {
    this.imgSrc = event.file;
    this.uploadImageComplete.emit(event.fileId);
  }
}
