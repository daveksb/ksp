import { Component, Input, OnInit } from '@angular/core';
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
export class SlideshowComponent implements OnInit {
  SchoolRequestSubType = SelfServiceRequestSubType;

  @Input() showButton = true;

  @Input() licensetype = 'null';
  @Input() licenseno = 'null';
  @Input() prefixth = 'null';
  @Input() firstnameth = 'null';
  @Input() lastnameth = 'null';
  @Input() prefixen = 'null';
  @Input() firstnameen = 'null';
  @Input() lastnameen = 'null';
  @Input() kuruspano = 'null';
  @Input() licensestartdate: any;
  @Input() licenseenddate: any;

  constructor() {}

  ngOnInit(): void {}
}
