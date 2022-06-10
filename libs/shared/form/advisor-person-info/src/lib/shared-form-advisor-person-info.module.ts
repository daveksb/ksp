import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorPersonInfoComponent } from './advisor-person-info/advisor-person-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructorPersonInfoComponent } from './instructor-person-info/instructor-person-info.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedUiAddRowButtonModule,
  ],
  declarations: [AdvisorPersonInfoComponent, InstructorPersonInfoComponent],
  exports: [AdvisorPersonInfoComponent, InstructorPersonInfoComponent],
})
export class SharedFormAdvisorPersonInfoModule {}
