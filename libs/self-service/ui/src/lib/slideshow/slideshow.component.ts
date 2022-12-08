import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { SelfPrefixEn, SelfPrefixTh, SelfServiceRequestSubType } from '@ksp/shared/constant';

@Component({
  selector: 'self-service-slideshow',
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {
  SchoolRequestSubType = SelfServiceRequestSubType;
  SelfPrefixTh = SelfPrefixTh;
  SelfPrefixEn = SelfPrefixEn;

  @Input() showButton = true;

  @Input() licensetype = '-';
  @Input() licenseno = '-';
  @Input() prefixth = '-';
  @Input() firstnameth = '-';
  @Input() lastnameth = '-';
  @Input() prefixen = '-';
  @Input() firstnameen = '-';
  @Input() lastnameen = '-';
  @Input() kuruspano = '-';
  @Input() licensestartdate: any;
  @Input() licenseenddate: any;

  constructor() {}

  ngOnInit(): void {}
}
