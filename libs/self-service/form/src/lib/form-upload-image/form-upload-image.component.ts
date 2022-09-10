import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';

@Component({
  selector: 'self-service-form-upload-image',
  templateUrl: './form-upload-image.component.html',
  styleUrls: ['./form-upload-image.component.css'],
  standalone: true,
  imports: [FileUploadComponent, CommonModule],
})
export class FormUploadImageComponent {
  @Input() imgDetail = 'row' || 'column';
}
