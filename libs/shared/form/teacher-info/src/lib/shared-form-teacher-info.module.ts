import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherGeneralInfoComponent } from './general-info/general-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructorInfoComponent } from './instructor-info/instructor-info.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedUiAddRowButtonModule,
  ],
  declarations: [TeacherGeneralInfoComponent, InstructorInfoComponent],
  exports: [TeacherGeneralInfoComponent, InstructorInfoComponent],
})
export class SharedFormTeacherInfoModule {}
