import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-request-license-approve-save-result',
  templateUrl: './request-license-approve-save-result.component.html',
  styleUrls: ['./request-license-approve-save-result.component.scss'],
})
export class RequestLicenseApproveSaveResultComponent {
  constructor(private router: Router) {}

  //ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }
}
