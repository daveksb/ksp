import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfActivitySelfLearningComponent } from './self-activity-self-learning/self-activity-self-learning.component';
import { SelfActivityMediaCreateComponent } from './self-activity-media-create/self-activity-media-create.component';
import { SelfActivityArticleWritingComponent } from './self-activity-article-writing/self-activity-article-writing.component';
import { SelfActivityBookWritingComponent } from './self-activity-book-writing/self-activity-book-writing.component';
import { SelfActivityAcademicWorkComponent } from './self-activity-academic-work/self-activity-academic-work.component';
import { SelfActivityMenterComponent } from './self-activity-menter/self-activity-menter.component';
import { SelfActivityMoreComponent } from './self-activity-more/self-activity-more.component';
import { SelfActivityAssessmentComponent } from './self-activity-assessment/self-activity-assessment.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SelfActivitySelfLearningComponent,
    SelfActivityMediaCreateComponent,
    SelfActivityArticleWritingComponent,
    SelfActivityBookWritingComponent,
    SelfActivityAcademicWorkComponent,
    SelfActivityMenterComponent,
    SelfActivityMoreComponent,
    SelfActivityAssessmentComponent,
  ],
  exports: [
    SelfActivitySelfLearningComponent,
    SelfActivityMediaCreateComponent,
    SelfActivityArticleWritingComponent,
    SelfActivityBookWritingComponent,
    SelfActivityAcademicWorkComponent,
    SelfActivityMenterComponent,
    SelfActivityMoreComponent,
    SelfActivityAssessmentComponent,
  ],
})
export class SharedFormSelfActivityFormModule {}
