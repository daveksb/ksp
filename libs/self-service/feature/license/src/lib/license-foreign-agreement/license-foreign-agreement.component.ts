import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'self-service-license-foreign-agreement',
  templateUrl: './license-foreign-agreement.component.html',
  styleUrls: ['./license-foreign-agreement.component.scss'],
})
export class LicenseForeignAgreementComponent implements OnInit {
  headerGroup = ['Issue Date', 'Form ID'];
  title = 'TEACHING LICENSE APPLICATION FORM';
  rules = [
    `1. Applicants must provide evidence of checking their educational institution whether recognized by either the Office of the Civil Service
  Commission, Thailand or by accrediting organizations that play a role in higher education accreditation which are recognized by the
  appropriate governmental authorities in their countries.`,

    `2. Applicants must provide an original official transcript sent to the Teachers' Council of Thailand in a sealed envelope with the
  institution's stamp. Void if envelope opened prior to receipt. Or`,

    `3. An original official degree confirmation letter for graduates of institution. The letter from the institution shall be on the official headed
  paper of the institution and clearly confirm that you have successfully completed your course, including the classification you receive, the
  dates of attendance and graduation. This letter must bear an original institution seal or stamp and signature of the Registrar sent in a
  sealed envelope with the institution's stamp. Void if envelope opened prior to receipt.
  (In case of the applicant hold a degree in education)`,

    `4. A statement of professional standing sent directly from the institution or licensing authority in the jurisdiction where the applicant is
  authorized to teach. (In case of the applicant do not hold a degree in education but have a teaching license from another country).`,

    `5. Any document not in English or Thai must be accompanied by an official Thai translation, prepared and certified as correct by an
  official translator. The Council considers an official translator to be a certified translator, a certified court interpreter, an authorized
  government official, or an official translation from a professional translation service or an appropriate language department at any
  university.`,

    `6. All copies of original documents being submitted must be certified as true copies of the original by the applicant or the authorized
  person.`,

    `7. Please ensure that all documents are completed according to the requirements for timely processing.`,
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  save() {
    const type = this.route.snapshot.queryParamMap.get('type');
    this.router.navigate(['/', 'license', 'foreign-teacher'], {
      queryParams: { type },
    });
  }

  cancel() {
    this.router.navigate(['/', 'home']);
  }

  ngOnInit(): void {}
}
