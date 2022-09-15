import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'self-service-foreign-license-step-three',
  templateUrl: './foreign-license-step-three.component.html',
  styleUrls: ['./foreign-license-step-three.component.scss'],
})
export class ForeignLicenseStepThreeComponent implements OnInit {
  @Input() documentTypes: 'request' | 'renew' = 'request';
  rules = [
    `Copy of educational certificate along with official transcripts`,
    `Copy of teaching license/ certificate from abroad (If any)`,
    `Original official degree confirmation letter for graduates of institution or an original official Transcript or
    original of statement of professional standing (as the case may be)`,
    `Copy of Translation of non-English or Thai documents`,
    `Copy of documentary evidence related to your professional certification (if any)`,
    `Original of Professional Experience Evaluation Form (this form must be completed and signed by all evaluators
    and enclosed with a copy of their current professional licenses)`,
    `Copy of all the used pages of the teacher's passport; preferably the photo page and present Non-B Visa page`,
    `Copy of all the used pages of the teacher's work permit`,
    `Other relevant documents (if any)
    e.g. Certificate of Name/Surname Change, Certificate of Marriage/Divorce, or related document, in case of name, or
    surname discrepancy between that appears on the degree certificate and that appears on the passport`,
    `Two 1 x 1.25 inch half-length, full face photograph; wearing formal clothing without hat and sunglasses; taken
    within 6 months before application submission (Do not wear a t-shirt or tank top, no smile; taken against plain,
    blue or white background)`,
    `Payment receipt for registration fee: 500 Baht`,
  ];

  files = [
    `An applicant's Qualification Identification Form`,
    `Copy of all the used pages of the teacher's passport; preferaly the photo page and present  Non-B Visa page`,
    `Copy of all the used pages of the teacher's work permit`,
    `Copy of the current teaching license`,
    `Copy of documents or evidence of the performance results of professional practice as specified`,
    `Copy of educational certificate along with official transcripts`,
  ];

  constructor() {}

  ngOnInit(): void {}
}
