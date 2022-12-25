import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-e-qualification-consider-meeting',
  templateUrl: './e-qualification-consider-meeting.component.html',
  styleUrls: ['./e-qualification-consider-meeting.component.scss'],
})
export class EQualificationConsiderMeetingComponent implements OnInit {
  verifyChoices = verifyChoices;

  constructor() {}

  ngOnInit(): void {}
}

const verifyChoices = [
  {
    name: 'รับรอง',
    value: 2,
  },
  {
    name: 'ไม่รับรอง',
    value: 3,
  },
  {
    name: 'ไม่พิจารณา',
    value: 4,
  },
];
