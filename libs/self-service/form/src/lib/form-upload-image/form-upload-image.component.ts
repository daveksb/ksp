import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestPageType } from '@ksp/shared/constant';
import { FileService, FileUploadComponent } from '@ksp/shared/form/file-upload';

@Component({
  selector: 'self-service-form-upload-image',
  templateUrl: './form-upload-image.component.html',
  styleUrls: ['./form-upload-image.component.scss'],
  standalone: true,
  imports: [FileUploadComponent, CommonModule],
})
export class FormUploadImageComponent {
  @Input() btnLabel = 'อัพโหลดรูปภาพ';
  @Input() isEditMode = true;
  @Input() imgSrc = '';
  @Input() requestType: any;
  @Input() uniqueTimestamp!: string;
  @Input() isForeignForm = false;
  @Input()
  set imageId(id: string) {
    if (id) {
      this.downloadFile(id);
    }
  }
  @Output() uploadImageComplete = new EventEmitter<any>();
  requestPageType = RequestPageType;

  constructor(private fileService: FileService) {}

  uploadComplete(event: any) {
    //console.log(event);
    this.imgSrc = event.file;
    this.uploadImageComplete.emit(event.fileId);
  }

  downloadFile(id: string) {
    this.fileService.downloadFile({ id }).subscribe((res: any) => {
      console.log(res);
      if (res?.filedata) {
        this.imgSrc = atob(res.filedata);
      }
    });
  }
}
