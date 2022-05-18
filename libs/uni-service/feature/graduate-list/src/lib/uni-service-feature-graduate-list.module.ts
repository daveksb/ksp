import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqListOfStudentsComponent } from './req-list-of-students/req-list-of-students.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ReqListOfStudentsComponent],
  exports: [ReqListOfStudentsComponent],
})
export class UniServiceFeatureGraduateListModule {}
