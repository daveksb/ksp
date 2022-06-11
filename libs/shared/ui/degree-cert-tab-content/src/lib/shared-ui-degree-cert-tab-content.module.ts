import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepTwoTabOneComponent } from './step-two-tab-one/step-two-tab-one.component';
import { StepTwoTeacherComponent } from './step-two-teacher/step-two-teacher.component';
import { StepTwoNitetComponent } from './step-two-nitet/step-two-nitet.component';
import { StepTwoAdvisorComponent } from './step-two-advisor/step-two-advisor.component';
import { StepThreeTabOneComponent } from './step-three-tab-one/step-three-tab-one.component';
import { StepThreeTabTwoComponent } from './step-three-tab-two/step-three-tab-two.component';
import { StepTwoTabOneSecondComponent } from './step-two-tab-one-second/step-two-tab-one-second.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { SharedFormAdvisorPersonInfoModule } from '@ksp/shared/form/advisor-person-info';

@NgModule({
  imports: [
    CommonModule,
    SharedUiAddRowButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedFormAdvisorPersonInfoModule,
  ],
  declarations: [
    StepTwoTabOneComponent,
    StepTwoTeacherComponent,
    StepTwoNitetComponent,
    StepTwoAdvisorComponent,
    StepThreeTabOneComponent,
    StepThreeTabTwoComponent,
    StepTwoTabOneSecondComponent,
  ],
  exports: [
    StepTwoTabOneComponent,
    StepTwoTeacherComponent,
    StepTwoNitetComponent,
    StepTwoAdvisorComponent,
    StepThreeTabOneComponent,
    StepThreeTabTwoComponent,
    StepTwoTabOneSecondComponent,
  ],
})
export class SharedUiDegreeCertTabContentModule {}
