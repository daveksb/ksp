import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelfServiceSelfDevelopActivityTiess } from '@ksp/shared/constant';
import { ListData, SelfDevelop } from '@ksp/shared/interface';
import { MyInfoService, SelfDevelopmentService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ksp-self-activity-detail',
  templateUrl: './self-activity-detail.component.html',
  styleUrls: ['./self-activity-detail.component.scss'],
})
export class SelfActivityDetailComponent implements OnInit {
  form = this.fb.group({
    type: [null, Validators.required],
    detail: [],
  });
  disabledSave = false;
  activityTypes: ListData[] = SelfServiceSelfDevelopActivityTiess;
  uniqueTimestamp: any;
  attachFiles = [
    {
      name: '1.วุฒิบัตร',
      fileid: '',
      filename: '',
    },
  ];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private selfDevelopmentService: SelfDevelopmentService,
    private myInfoService: MyInfoService
  ) {}
  baseForm = this.fb.group(new SelfDevelop());
  get formInValid() {
    return this.form.invalid;
  }
  get activityType() {
    return this.form.controls.type;
  }
  ngOnInit(): void {
    this.form.controls.type.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(0),
        switchMap(() => {
          this.disabledSave = this.form.invalid;
          return this.form.valueChanges;
        })
      )
      .subscribe(() => {
        this.disabledSave = this.form.invalid;
      });
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
    });
    this.initializeFile();
  }

  initializeFile() {
    this.uniqueTimestamp = uuidv4();
    console.log(this.uniqueTimestamp);
  }

  onClickSave() {
    const payload = this.baseForm.value;
    const { detail, type } = this.form.value;
    payload.selfdevelopdetail = JSON.stringify(detail);
    payload.selfdeveloptype = JSON.stringify(type);
    payload.selfdevelopfiles = JSON.stringify(this.attachFiles);
    payload.systemtype = '1';
    payload.staffid = '111'; // mock
    payload.schoolid = '111'; // mock
    payload.licenseid = '777'; // mock
    payload.licenseno = '1'; // mock
    payload.licensetype = '2'; // mock
    this.selfDevelopmentService.createSelfDevelop(payload).subscribe((res) => {
      console.log(res);
    });
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
