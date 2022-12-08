import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';

@Component({
  selector: 'self-service-slideshow',
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent {
  SchoolRequestSubType = SelfServiceRequestSubType;

  @Input() showButton = true;

  @Input() licensetype = '-';
  @Input() licenseno: string | null = '-';
  @Input() prefixth: string | null = '-';
  @Input() firstnameth: string | null = '-';
  @Input() lastnameth: string | null = '-';
  @Input() prefixen: string | null = '-';
  @Input() firstnameen: string | null = '-';
  @Input() lastnameen: string | null = '-';
  @Input() kuruspano: string | null = '-';
  @Input() licensestartdate: string | null = null;
  @Input() licenseenddate: string | null = null;
}
