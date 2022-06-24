import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherGeneralInfoComponent } from './general-info/general-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { LessExpNitetComponent } from './less-exp-nitet/less-exp-nitet.component';
import { AdvisorInfoComponent } from './advisor-info/advisor-info.component';
import { HideInViewModeDirective } from '@ksp/shared/directive';
import { AddRowButtonComponent } from '@ksp/shared/ui';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    AddRowButtonComponent,
    HideInViewModeDirective,
  ],
  declarations: [
    TeacherGeneralInfoComponent,
    LessExpNitetComponent,
    AdvisorInfoComponent,
  ],
  exports: [
    TeacherGeneralInfoComponent,
    LessExpNitetComponent,
    AdvisorInfoComponent,
  ],
})
export class SharedFormTeacherInfoModule {}
