import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-form-requester-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requester-info.component.html',
  styleUrls: ['./requester-info.component.scss'],
})
export class FormRequesterInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
