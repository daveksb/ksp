import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityAddDegreeComponent } from './activity-add-degree/activity-add-degree.component';
import { ActivitySeminarComponent } from './activity-seminar/activity-seminar.component';
import { ActivityStudyTourComponent } from './activity-study-tour/activity-study-tour.component';
import { ActivityResearchComponent } from './activity-research/activity-research.component';
import { ActivityLearningMaterialComponent } from './activity-learning-material/activity-learning-material.component';
import { ActivityWriteBookComponent } from './activity-write-book/activity-write-book.component';
import { ActivityAcademicArchivementComponent } from './activity-academic-archivement/activity-academic-archivement.component';
import { ActivityLecturerComponent } from './activity-lecturer/activity-lecturer.component';
import { ActivityDiplomaReceiveComponent } from './activity-diploma-receive/activity-diploma-receive.component';
import { ActivityInnovationComponent } from './activity-innovation/activity-innovation.component';
import { ActivityRewardComponent } from './activity-reward/activity-reward.component';
import { ActivityLectureRegisterComponent } from './activity-lecture-register/activity-lecture-register.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ActivityAddDegreeComponent,
    ActivitySeminarComponent,
    ActivityStudyTourComponent,
    ActivityResearchComponent,
    ActivityLearningMaterialComponent,
    ActivityWriteBookComponent,
    ActivityAcademicArchivementComponent,
    ActivityLecturerComponent,
    ActivityDiplomaReceiveComponent,
    ActivityInnovationComponent,
    ActivityRewardComponent,
    ActivityLectureRegisterComponent,
  ],
  exports: [
    ActivityAddDegreeComponent,
    ActivitySeminarComponent,
    ActivityStudyTourComponent,
    ActivityResearchComponent,
    ActivityLearningMaterialComponent,
    ActivityWriteBookComponent,
    ActivityAcademicArchivementComponent,
    ActivityLecturerComponent,
    ActivityDiplomaReceiveComponent,
    ActivityInnovationComponent,
    ActivityRewardComponent,
    ActivityLectureRegisterComponent,
  ],
})
export class SchoolServiceFormActivityModule {}
