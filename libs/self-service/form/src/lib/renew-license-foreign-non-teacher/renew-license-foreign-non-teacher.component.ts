import { Component } from '@angular/core';
import { NonTeacherFormBaseComponent } from '../non-teacher-form-base.component';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-renew-license-foreign-non-teacher',
  templateUrl: './renew-license-foreign-non-teacher.component.html',
  styleUrls: ['./renew-license-foreign-non-teacher.component.scss'],
  providers: providerFactory(RenewLicenseForeignNonTeacherComponent),
})
export class RenewLicenseForeignNonTeacherComponent extends NonTeacherFormBaseComponent {}
