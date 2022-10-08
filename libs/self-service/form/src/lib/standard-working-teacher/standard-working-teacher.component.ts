import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import { InserviceTeacherFormBaseComponent } from '../in-service-teacher-form-base.component';

@UntilDestroy()
@Component({
  selector: 'self-service-standard-working-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SchoolServiceFormActivityModule],
  templateUrl: './standard-working-teacher.component.html',
  styleUrls: ['./standard-working-teacher.component.scss'],
  providers: providerFactory(StandardWorkingTeacherComponent),
})
export class StandardWorkingTeacherComponent extends InserviceTeacherFormBaseComponent {}
