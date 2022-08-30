import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'self-service-slideshow-second',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow-second.component.html',
  styleUrls: ['./slideshow-second.component.scss'],
})
export class SlideshowSecondComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
