import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'self-service-foreign-license-step-one',
  templateUrl: './foreign-license-step-one.component.html',
  styleUrls: ['./foreign-license-step-one.component.scss'],
})
export class ForeignLicenseStepOneComponent implements OnInit {
  rules = [
    `1. Teaching License Application Form (Form KS. 01)`,
    `2. Copy of educational certificate along with official transcript`,
    `3. Copy of teaching license/ certificate from abroad (If any)`,
    `4. Original official degree confirmation letter for graduates of institution or an originalofficial transcript or original of statement of
    professional standing (as the case may be)`,
    `5. Copy of translation of non-English or Thai documents
    - Any document not in English or Thai, it must be accompanied by an official Thai
    translation, prepared and certified as correct by an official translator. The Council considers an official translator to be a certified
    translator, a certified court interpreter, an authorized government official, or an official translation from a professional translation
    service or an appropriate language department at any university).`,
    `6. Copy of documentary evidence of passing professional certification in accordance with the professional standards ofthe Teachers'
    Council of Thailand (If any)`,
    `7. Original of Professional Experience Evaluation Form
    - The evaluator group must be between 3 and 5 people. These people must include
    an educational institution administrator, a teacher in the institution, or other related persons (e.g. educational supervisor or
    specialist in learning management).
    These persons will evaluate together as a group.
    - This form must be completed and signed by all evaluators; including attached with photocopies of their current professional
    licenses that are certified as true copies of the original.`,
    `8. Copy of the applicant's passport, particularly the photo page and the latest update current school NON-B Visa
    - In case of holding visa type “NON-O”, please attach a copy of individual official documents having relationship with Thai people
    such as birth certificate, marriage certificate or other
    related documents.).`,
    `9. Copy of all used paged of Thai Work Permit
    - The work place stated on applicant's Work Permit must be the same educational
    institution stated on Professional Experience Evaluation Form. Period of working experience shall be counted as one consecutive year
    from the date the work permit issued until the date of application`,
    `10. Copy of Certificate of Name/Surname Change, Certificate of Marriage/Divorce, or related document, in case of name, or surname
    discrepancy between that appears on the degree certificate and that appears on the passport`,
    `11. Two 1 X 1.25 inch half-length, full face photographs in which the applicant is facing
    the camera directly; wearing formal clothing without hat and sunglasses; taken against plain, blue or white background and taken
    within the last six months (Do not wear a t-shirt or tank top, no smile)
    - Scanned Polaroid and photographs printed on an inkjet printer are unacceptable. - One photograph will be glue to the application
    form in the designated space
    and place another one in a small zippered plastic bag and staple it to the form.`,
    `12. Payment receipt for registration fee: 500 Baht`,
  ];

  constructor() {}

  ngOnInit(): void {}
}
