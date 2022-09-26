import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelfServiceSelfDevelopActivityTiess } from '@ksp/shared/constant';
import { ListData } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-self-activity-detail',
  templateUrl: './self-activity-detail.component.html',
  styleUrls: ['./self-activity-detail.component.scss'],
})
export class SelfActivityDetailComponent {
  form = this.fb.group({
    type: [null, Validators.required],
    detail: [],
  });

  activityTypes: ListData[] = SelfServiceSelfDevelopActivityTiess;

  attachFiles = [
    {
      name: '1.วุฒิบัตร',
      fileId: '',
    },
  ];

  constructor(
    //private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  get activityType() {
    return this.form.controls.type;
  }
}

/* const componentList = [
  ActivityAddDegreeComponent,
  ActivitySeminarComponent,
  SelfActivitySelfLearningComponent,
  ActivityStudyTourComponent,
  ActivityResearchComponent,
  SelfActivityMediaCreateComponent,
  ActivityStudyTourComponent,
  SelfActivityArticleWritingComponent,
  SelfActivityBookWritingComponent,
  SelfActivityAcademicWorkComponent,
  ActivityLecturerComponent,
  SelfActivityMenterComponent,
  SelfActivityAssessmentComponent,
  ActivityRewardComponent,
  SelfActivityMoreComponent,
];
 */
