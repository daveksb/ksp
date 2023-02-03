import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NonTeacherFormBaseComponent } from '../non-teacher-form-base.component';

@UntilDestroy()
@Component({
  selector: 'self-service-standard-working-non-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SchoolServiceFormActivityModule],
  templateUrl: './standard-working-non-teacher.component.html',
  styleUrls: ['./standard-working-non-teacher.component.scss'],
  providers: providerFactory(StandardWorkingNonTeacherComponent),
})
export class StandardWorkingNonTeacherComponent extends NonTeacherFormBaseComponent {}
