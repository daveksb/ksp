import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'self-service-foreign-license-step-three',
  templateUrl: './foreign-license-step-three.component.html',
  styleUrls: ['./foreign-license-step-three.component.scss'],
})
export class ForeignLicenseStepThreeComponent implements OnInit {
  rules = [
    `2.1 Copy of educational certificate along with official transcripts`,
    `2.2 Copy of teaching license/ certificate from abroad (If any)`,
    `2.3 Original official degree confirmation letter for graduates of institution or an original official Transcript or
    original of statement of professional standing (as the case may be)`,
    `2.4 Copy of Translation of non-English or Thai documents`,
    `2.5 Copy of documentary evidence related to your professional certification (if any)`,
    `2.6 Original of Professional Experience Evaluation Form (this form must be completed and signed by all evaluators
    and enclosed with a copy of their current professional licenses)`,
    `2.7 Copy of all the used pages of the teacher's passport; preferably the photo page and present Non-B Visa page`,
    `2.8 Copy of all the used pages of the teacher's work permit`,
    `2.9 Other relevant documents (if any)
    e.g. Certificate of Name/Surname Change, Certificate of Marriage/Divorce, or related document, in case of name, or
    surname discrepancy between that appears on the degree certificate and that appears on the passport`,
    `2.10 Two 1 x 1.25 inch half-length, full face photograph; wearing formal clothing without hat and sunglasses; taken
    within 6 months before application submission (Do not wear a t-shirt or tank top, no smile; taken against plain,
    blue or white background)`,
    `2.11 Payment receipt for registration fee: 500 Baht`,
  ];

  constructor() {}

  ngOnInit(): void {}
}
