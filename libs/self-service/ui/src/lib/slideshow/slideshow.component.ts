import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import {
  SelfPrefixEn,
  SelfPrefixTh,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { SelfLicense } from '@ksp/shared/interface';
//import { FormUploadImageComponent } from '@ksp/self-service/form';

@Component({
  selector: 'self-service-slideshow',
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent {
  SchoolRequestSubType = SelfServiceRequestSubType;
  SelfPrefixTh = SelfPrefixTh;
  SelfPrefixEn = SelfPrefixEn;

  @Input() showButton = true;
  @Input() license = new SelfLicense();
}
