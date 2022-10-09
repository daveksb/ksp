import { Component } from '@angular/core';
import { providerFactory } from '@ksp/shared/utility';
import { InserviceTeacherFormBaseComponent } from '../in-service-teacher-form-base.component';

@Component({
  selector: 'self-service-renew-license-foreign-teacher',
  templateUrl: './renew-license-foreign-teacher.component.html',
  styleUrls: ['./renew-license-foreign-teacher.component.scss'],
  providers: providerFactory(RenewLicenseForeignTeacherComponent),
})
export class RenewLicenseForeignTeacherComponent extends InserviceTeacherFormBaseComponent {}
