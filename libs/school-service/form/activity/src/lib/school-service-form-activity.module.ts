import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityAddDegreeComponent } from './activity-add-degree/activity-add-degree.component';
import { ActivitySeminarComponent } from './activity-seminar/activity-seminar.component';
import { ActivityTrainningComponent } from './activity-trainning/activity-trainning.component';
import { ActivitySelfStudyComponent } from './activity-self-study/activity-self-study.component';
import { ActivityStudyTourComponent } from './activity-study-tour/activity-study-tour.component';
import { ActivityResearchComponent } from './activity-research/activity-research.component';
import { ActivityLearningMaterialComponent } from './activity-learning-material/activity-learning-material.component';
import { ActivityCareerDevelopmentComponent } from './activity-career-development/activity-career-development.component';
import { ActivityWriteArticleComponent } from './activity-write-article/activity-write-article.component';
import { ActivityWriteBookComponent } from './activity-write-book/activity-write-book.component';
import { ActivityAcademicArchivementComponent } from './activity-academic-archivement/activity-academic-archivement.component';
import { ActivityLecturerComponent } from './activity-lecturer/activity-lecturer.component';
import { ActivityMentorComponent } from './activity-mentor/activity-mentor.component';
import { ActivityAssetmentPassComponent } from './activity-assetment-pass/activity-assetment-pass.component';
import { ActivityOutstandingTeachingComponent } from './activity-outstanding-teaching/activity-outstanding-teaching.component';
import { ActivityOtherComponent } from './activity-other/activity-other.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ActivityAddDegreeComponent,
    ActivitySeminarComponent,
    ActivityTrainningComponent,
    ActivitySelfStudyComponent,
    ActivityStudyTourComponent,
    ActivityResearchComponent,
    ActivityLearningMaterialComponent,
    ActivityCareerDevelopmentComponent,
    ActivityWriteArticleComponent,
    ActivityWriteBookComponent,
    ActivityAcademicArchivementComponent,
    ActivityLecturerComponent,
    ActivityMentorComponent,
    ActivityAssetmentPassComponent,
    ActivityOutstandingTeachingComponent,
    ActivityOtherComponent,
  ],
  exports: [
    ActivityAddDegreeComponent,
    ActivitySeminarComponent,
    ActivityTrainningComponent,
    ActivitySelfStudyComponent,
    ActivityStudyTourComponent,
    ActivityResearchComponent,
    ActivityLearningMaterialComponent,
    ActivityCareerDevelopmentComponent,
    ActivityWriteArticleComponent,
    ActivityWriteBookComponent,
    ActivityAcademicArchivementComponent,
    ActivityLecturerComponent,
    ActivityMentorComponent,
    ActivityAssetmentPassComponent,
    ActivityOutstandingTeachingComponent,
    ActivityOtherComponent,
  ],
})
export class SchoolServiceFormActivityModule {}
